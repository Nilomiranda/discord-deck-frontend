import {Box, Button, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {TOAST_DEFAULT_DURATION} from "../config/constants";
import Input from "../components/form/Input";
import {login} from "../services/auth";

const LoginPage = () => {
  const toast = useToast()
  const router = useRouter()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = async (event: Event) => {
    event?.preventDefault()
    setIsAuthenticating(true)

    try {
      const response = await login(email, password)
      console.log('response', response)

      router.push('/app/dashboard')
    } catch (err) {
      toast({
        description: err?.response?.data?.errors || 'An unexpected error occurred.',
        status: 'error',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true
      })
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <Box h="100vh" w="100%" display="flex" alignItems="center" justifyContent="center" backgroundColor="gray.800">
      <Box as="form" display="flex" flexDirection="column" w={"100%"} maxWidth={"400px"} px="1rem" onSubmit={handleLoginSubmit}>
        <Box mb={"1rem"}>
          <Input label={"Email"} placeholder={"email"} type={"email"} id={"email"} value={email} onChange={(event) => setEmail(event?.target?.value)} />
        </Box>

        <Box mb={"1rem"}>
          <Input label={"Password"} placeholder={"password"} type={"password"} id={"password"} value={password} onChange={(event) => setPassword(event?.target?.value)} />
        </Box>

        <Button mt={"1.5rem"} type="submit" colorScheme="pink" isLoading={isAuthenticating}>Login</Button>
      </Box>
    </Box>
  )
}

export default LoginPage
