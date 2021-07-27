import {Box, Button, LinkBox, LinkOverlay} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useCallback, useEffect} from "react";
import {getDiscordBearerToken} from "../services/auth";

const LoginPage = () => {
  const router = useRouter()

  const handleDiscordAuthentication = useCallback(async (code) => {
    // console.log("router.query.code", router.query.code)
    // const { code } = router.query
    console.log("code", code)

    const res = await getDiscordBearerToken(code as string, 'http://localhost:4000/login')
    console.log('res', res)
  }, [])

  useEffect(() => {
    console.log("router.query", router.query?.code)
    if (router?.query?.code) {
      handleDiscordAuthentication(router?.query?.code)
    }
  }, [router?.query])

  return (
    <Box h="100vh" w="100%" display="flex" alignItems="center" justifyContent="center" backgroundColor="gray.800">
      <Box display="flex" flexDirection="column" >
        <LinkBox>
          <LinkOverlay href="https://discord.com/api/oauth2/authorize?client_id=867573610789208094&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Flogin&response_type=code&scope=identify">
            <Button type="button" colorScheme="pink">Login with discord</Button>
          </LinkOverlay>
        </LinkBox>
      </Box>
    </Box>
  )
}

export default LoginPage
