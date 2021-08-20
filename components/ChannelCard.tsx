import { Box, Heading, VStack, CloseButton, Button, HStack, Tag, Text } from '@chakra-ui/react'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useEffect, useState } from 'react'
import { GuildChannel } from '../interfaces/guildChannel'
import { ChannelMessage as ChannelMessageType } from '../interfaces/channelMessage'
import { useSelectedChannelsStore } from '../stores/selectedChannelsStore'
import ChannelMessage from './ChannelMessage'
import SendMessageModal from './SendMessageModal'
import { GuildRole } from '../interfaces/guildRole'
import { UserContext } from '../contexts/CurrentUser'

interface ChannelCardProps {
  channel: GuildChannel
}

const ChannelCard = ({ channel }: ChannelCardProps) => {
  const queryClient = useQueryClient()
  const removeChannelFromList = useSelectedChannelsStore((state) => state?.removeChannelFromList)
  const { user } = useContext(UserContext)

  const { data: messageData } = useQuery<{ messages: ChannelMessageType[] }>(`discord/channels/messages?channelId=${channel?.id}`, { enabled: !!channel?.id })
  const { data: rolesData } = useQuery<{ roles: GuildRole[] }>(`discord/guilds/roles?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const { data: rolesPresetData } = useQuery<{ rolesIds: string[] }>(`/users/channels/${channel?.id}/presets`, { enabled: !!channel?.id && !!rolesData?.roles?.length })

  const [messages, setMessages] = useState<ChannelMessageType[]>([])
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<ChannelMessageType>(null)
  const [currentSorting, setCurrentSorting] = useState<'newest' | 'oldest'>('newest')
  const [presetRoles, setPresetRoles] = useState<GuildRole[]>([])

  useEffect(() => {
    if (rolesPresetData?.rolesIds) {
      setPresetRoles(rolesPresetData?.rolesIds?.map((roleId) => rolesData?.roles?.find((roleData) => roleData?.id === roleId)))
    }
  }, [rolesPresetData])

  const handleMessageClick = (message: ChannelMessageType) => {
    setSelectedMessage(message)
    setIsMessageModalOpen(true)
  }

  const handleSelectedMessageModalClosed = () => {
    setIsMessageModalOpen(false)
    setSelectedMessage(null)
  }

  const handleSortClick = () => {
    const newSortingState = currentSorting === 'newest' ? 'oldest' : 'newest'
    setCurrentSorting(newSortingState)
    setMessages(messageData?.messages?.reverse())
  }

  useEffect(() => {
    if (messageData?.messages?.length) {
      if (currentSorting === 'oldest') {
        setMessages(messageData?.messages?.reverse())
      } else {
        setMessages(messageData?.messages)
      }
    }
  }, [messageData])

  useEffect(() => {
    const messageLoadingInterval = setInterval(() => {
      queryClient?.refetchQueries([`discord/channels/messages?channelId=${channel?.id}`])
    }, 3000)

    return () => {
      clearInterval(messageLoadingInterval)
    }
  }, [])

  if (!channel) {
    return null
  }

  return (
    <>
      <Box h="100%" width="400px" overflowX="hidden" overflowY="hidden">
        <VStack pb="1rem" align="start">
          <Box display="flex" alignItems="center" justifyContent="space-between" w="400px" bg="gray.900" py="0.5rem">
            <Box display="flex" alignItems="center">
              <Heading fontSize="lg" color="gray.600" mr="0.5rem">
                {channel.name}
              </Heading>
              <Button colorScheme="gray" variant="link" fontSize="sm" onClick={handleSortClick}>
                Sort by {currentSorting === 'newest' ? 'oldest' : 'newest'}
              </Button>
            </Box>
            <CloseButton color="red" onClick={() => removeChannelFromList(channel?.id)} />
          </Box>
          {presetRoles?.length ? (
            <>
              <Text color="gray.400" fontSize="sm">
                Selected roles
              </Text>

              <HStack spacing="1rem">
                {presetRoles?.map((presetRole) => (
                  <Tag key={presetRole?.id} background="gray.700" color="white">
                    {presetRole?.name}
                  </Tag>
                ))}
              </HStack>
            </>
          ) : null}
        </VStack>

        <VStack spacing="1rem" overflowY="auto" h="100%" pr="0.75rem" pb="3.5rem">
          {messages
            ?.filter((message) => message?.content?.length || message?.embeds?.length)
            ?.map((message) => (
              <ChannelMessage key={message?.id} message={message} channel={channel} onMessageClick={handleMessageClick} presetRoles={presetRoles} pingRolesShortcut={!!presetRoles?.length} />
            ))}
        </VStack>
      </Box>

      <SendMessageModal isOpen={isMessageModalOpen} onClose={handleSelectedMessageModalClosed} selectedMessage={selectedMessage} />
    </>
  )
}

export default ChannelCard
