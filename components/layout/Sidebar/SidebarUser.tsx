import {useContext} from "react";
import {Avatar, Box, Button, Text, Spinner, useToast} from "@chakra-ui/react";
import { IoLogOutOutline } from 'react-icons/io5'
import cookies from 'js-cookie'
import {useRouter} from "next/router";
import {UserContext} from "../../../contexts/CurrentUser";
import {DISCORD_USER_AVATAR_CDN_BASE_URL, TOAST_DEFAULT_DURATION} from "../../../config/constants";
import {logout} from "../../../services/auth";

const SidebarUser = () => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useContext(UserContext)

  const handleLogOut = async () => {
    try {
      await logout()
      toast({
        status: 'success',
        isClosable: true,
        duration: TOAST_DEFAULT_DURATION,
        description: 'Logged out'
      })
      router.push('/login')
    } catch (err) {
      toast({
        status: 'error',
        isClosable: true,
        duration: TOAST_DEFAULT_DURATION,
        description: 'Could not log you out'
      })
    }
  }

  if (!user) {
    return (
      <Box padding={"1rem"}>
        <Spinner color={"white"} />
      </Box>
    )
  }

  return (
    <Box padding={"1rem"} display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
      <Box display={"flex"} alignItems={"flex-start"}>
        <Avatar name={user?.username} src={`${DISCORD_USER_AVATAR_CDN_BASE_URL}/${user?.id}/${user?.avatar}.png`}  />

        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} ml={"1rem"}>
          <Text color={"white"} fontSize={"xl"}>{user?.username}</Text>
          <Text color={"white"}>{user?.email}</Text>
        </Box>
      </Box>

      <Button size={"sm"} mt={"1.5rem"} leftIcon={<IoLogOutOutline />} colorScheme={"blackAlpha"} onClick={handleLogOut}>Log out</Button>
    </Box>
  )
}

export default SidebarUser
