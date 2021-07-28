import {Box, Button, LinkBox, LinkOverlay, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import cookies from 'js-cookie'
import {DiscordBearerTokenResponse, fetchDiscordAccessToken, fetchDiscordOauthUrl} from "../services/auth";
import {TOAST_DEFAULT_DURATION} from "../config/constants";

const LoginPage = () => {
  const toast = useToast()
  const router = useRouter()
  const [discordOauthUrl, setDiscordOauthUrl] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const getDiscordOauthUrl = useCallback(async () => {
    try {
      const response = await fetchDiscordOauthUrl('http://localhost:4000/login')
      setDiscordOauthUrl(response?.data?.url)
    } catch (err) {
      console.error('Error getting discord oauth url')
      toast({
        description: "Error getting Discord's url",
        status: "error",
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    }
  }, [])

  const handleDiscordAuthentication = (data: DiscordBearerTokenResponse) => {
    if (!data) {
      return
    }

    cookies.set('DISCORD_ACCESS_TOKEN', data?.accessToken)

    setTimeout(() => {
      router.push('/app/dashboard')
    }, 1000)
  }

  const getDiscordAccessToken = useCallback(async (code: string) => {
    setIsAuthenticating(true)

    try {
      const response = await fetchDiscordAccessToken(code, 'http://localhost:4000/login')
      handleDiscordAuthentication(response?.data)
    } catch (err) {
      console.error('Error getting discord access token')
      toast({
        description: "Error authenticating with Discord",
        status: "error",
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } finally {
      setIsAuthenticating(false)
    }
  }, [])

  useEffect(() => {
    getDiscordOauthUrl()
  }, [])

  useEffect(() => {
    if (router?.query?.code) {
      getDiscordAccessToken(router?.query?.code as string)
    }
  }, [router?.query?.code])

  return (
    <Box h="100vh" w="100%" display="flex" alignItems="center" justifyContent="center" backgroundColor="gray.800">
      <Box display="flex" flexDirection="column" >
        {
          discordOauthUrl ? (
            <LinkBox>
              <LinkOverlay href={discordOauthUrl}>
                <Button type="button" colorScheme="pink" isLoading={isAuthenticating}>Login with discord</Button>
              </LinkOverlay>
            </LinkBox>
          ) : null
        }
      </Box>
    </Box>
  )
}

export default LoginPage
