import { useContext } from 'react'
import { Avatar, Box, Button, Text, Spinner, useToast, Divider, VStack } from '@chakra-ui/react'
import { IoLogOutOutline, IoSettings } from 'react-icons/io5'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserContext } from '../../../contexts/CurrentUser'
import { TOAST_DEFAULT_DURATION } from '../../../config/constants'
import { logout } from '../../../services/auth'
import { getUserAvatar } from '../../../interfaces/user'
import { useSelectedChannelsStore } from '../../../stores/selectedChannelsStore'

const SidebarUser = () => {
  const clearSelectedChannels = useSelectedChannelsStore((state) => state?.clearSelectedChannels)
  const toast = useToast()
  const router = useRouter()
  const { user, discordUser } = useContext(UserContext)

  const handleLogOut = async () => {
    try {
      await logout()
      window?.localStorage?.clear()
      clearSelectedChannels()
      toast({
        status: 'success',
        isClosable: true,
        duration: TOAST_DEFAULT_DURATION,
        description: 'Logged out',
      })
      router.push('/login')
    } catch (err) {
      toast({
        status: 'error',
        isClosable: true,
        duration: TOAST_DEFAULT_DURATION,
        description: 'Could not log you out',
      })
    }
  }

  if (!user) {
    return (
      <Box padding="1rem">
        <Spinner color="white" />
      </Box>
    )
  }

  return (
    <Box padding="1rem" display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="flex-start">
        <Avatar name={discordUser?.username} src={getUserAvatar(discordUser)} />

        <Box display="flex" flexDirection="column" alignItems="flex-start" ml="1rem">
          <Text color="white" fontSize="xl">
            {discordUser?.username}{' '}
            <Text as="span" fontSize="sm" color="gray.600">
              ({user?.guildName})
            </Text>
          </Text>
          <Text color="white">{user?.email}</Text>
        </Box>
      </Box>

      <Button size="sm" mt="1.5rem" leftIcon={<IoLogOutOutline />} colorScheme="blackAlpha" onClick={handleLogOut}>
        Log out
      </Button>

      <Divider colorScheme="gray" mt="1rem" />

      <VStack mt="1rem">
        <Link href="/app/settings">
          <Button size="sm" _hover={{ background: '#352936' }} colorScheme="pink" variant="ghost" leftIcon={<IoSettings />} color="white">
            Settings
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default SidebarUser
