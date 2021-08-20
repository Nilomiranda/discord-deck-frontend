import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Text, Textarea, useToast, Checkbox } from '@chakra-ui/react'
import {useContext, useEffect, useState} from 'react'
import Select from 'react-select'
import { useQuery } from 'react-query'
import { ChannelMessage as ChannelMessageType } from '../interfaces/channelMessage'
import ChannelMessage from './ChannelMessage'
import { GuildRole } from '../interfaces/guildRole'
import { UserContext } from '../contexts/CurrentUser'
import { sendMessage } from '../services/discord'
import { TOAST_DEFAULT_DURATION } from '../config/constants'
import { GuildMember } from '../interfaces/guildMember'
import {GuildChannel} from "../interfaces/guildChannel";

interface SendMessageModalProps {
  isOpen: boolean
  onClose: () => void
  selectedMessage: ChannelMessageType
}

const SendMessageModal = ({ isOpen, onClose, selectedMessage }: SendMessageModalProps) => {
  const { user } = useContext(UserContext)
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const { data: rolesData } = useQuery<{ roles: GuildRole[] }>(`discord/guilds/roles?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const { data: membersData } = useQuery<{ members: GuildMember[] }>(`discord/guilds/members?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const toast = useToast()

  const [message, setMessage] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<{ label: string; value: string }[]>([])
  const [selectedMembers, setSelectedMembers] = useState<{ label: string; value: string }[]>([])
  const [selectedChannels, setSelectedChannels] = useState<{ label: string; value: string }[]>([])
  const [sendAsReply, setSendAsReply] = useState<boolean>(false)
  const [sendingMessage, setSendingMessage] = useState(false)

  const validateForm = (): boolean => {
    if (!selectedRoles?.length && !selectedMembers?.length && !message) {
      toast({
        description: "You have to select a role, or a member, or type something in the message box. Empty messages are not allowed.",
        status: "error",
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true
      })

      return false;
    }

    if (!selectedChannels?.length) {
      toast({
        description: "At least one channel is required to send a message",
        status: "error",
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true
      })

      return false
    }

    return true
  }

  const clearForm = () => {
    setSelectedRoles([])
    setSendAsReply(false)
    setMessage('')
    setSelectedMembers([])
  }

  const handleSendMessage = async () => {
    if (!validateForm()) {
      return
    }

    const mappedRolesToMentionString = selectedRoles?.length ? selectedRoles?.map((selectedRole) => `<@&${selectedRole?.value}>`)?.join(' ') : ''
    const mappedMembersToMentionString = selectedMembers?.length ? selectedMembers?.map((selectedMember) => `<@!${selectedMember?.value}>`)?.join(' ') : ''

    const content = `${message || ''} ${mappedRolesToMentionString} ${mappedMembersToMentionString}`

    try {
      setSendingMessage(true)
      await sendMessage(selectedChannels?.map(selectedChannel => selectedChannel?.value), content, selectedMessage?.channel_id, user?.guildID, sendAsReply ? selectedMessage?.id : null)

      clearForm()

      toast({
        status: 'success',
        description: `Message${selectedChannels?.length > 1 ? 's' : ''} sent`,
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } catch (err) {
      console.error('Error sending message to channel', err)
      toast({
        status: 'error',
        description: `We couldn't send the message. Please try again later`,
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } finally {
      setSendingMessage(false)
    }
  }

  const handleSendAsReplyOptionChange = (event) => {
    const {
      target: { checked },
    } = event
    setSendAsReply(checked)
  }

  const handleMentionListChanged = (values: { label: string; value: string }[]) => {
    setSelectedRoles([...values])
  }

  const handleMembersMentionListChanged = (values: { label: string; value: string }[]) => {
    setSelectedMembers([...values])
  }

  const handleChannelsListChanged = (values: { label: string; value: string }[]) => {
    setSelectedChannels([...values])
  }

  useEffect(() => {
    if (channelsData?.channels?.length && isOpen) {
      const channel = channelsData?.channels?.find(channel => channel?.id === selectedMessage?.channel_id)

      const channelAlreadySelected = selectedChannels?.map(selectedChannel => selectedChannel?.value)?.includes(channel?.id)

      if (channel && !channelAlreadySelected) {
        setSelectedChannels([...selectedChannels, { label: channel?.name, value: channel?.id }])
      }
    }
  }, [channelsData, isOpen])

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent background="gray.900">
        <ModalCloseButton color="gray.600" />
        <ModalBody mt="3rem">
          <Box mb="1.5rem">
            <ChannelMessage message={selectedMessage} scrollable pingRolesShortcut={false} />
          </Box>

          <Text color="white" fontSize="sm" mb="0.75rem">
            Role mentions
          </Text>
          <Select
            value={selectedRoles}
            isMulti
            options={rolesData?.roles?.length ? rolesData?.roles?.map((role) => ({ label: role?.name, value: role?.id })) : []}
            className="basic-multi-select"
            classNamePrefix="friday-deck-select"
            onChange={handleMentionListChanged}
          />

          <Text color="white" fontSize="sm" mb="0.75rem" mt="1.25rem">
            Member mentions
          </Text>
          <Select
            value={selectedMembers}
            isMulti
            options={membersData?.members?.length ? membersData?.members?.map((member: GuildMember) => ({ label: member?.nick || member?.user?.username, value: member?.user?.id })) : []}
            className="basic-multi-select"
            classNamePrefix="friday-deck-select"
            onChange={handleMembersMentionListChanged}
          />

          <Textarea
            placeholder="Type your message here"
            size="sm"
            height="200px"
            borderRadius="0.5rem"
            background="transparent"
            color="white"
            borderStyle="solid"
            borderColor="gray.600"
            mt="2rem"
            onChange={({ target: { value } }) => setMessage(value)}
            value={message}
          />

          <Checkbox color="white" colorScheme="pink" onChange={handleSendAsReplyOptionChange} isChecked={sendAsReply} mt={"1.5rem"}>
            Send as reply
          </Checkbox>

          <Text color="white" fontSize="sm" mb="0.75rem" mt={"2rem"}>
            Channels to send to:
          </Text>
          <Text color="gray.400" fontSize="xs" mb="0.75rem">
            By default, the message's channel will receive the message, unless you remove from the list.
          </Text>
          <Select
            value={selectedChannels}
            isMulti
            options={channelsData?.channels?.length ? channelsData?.channels?.filter((channel) => channel?.type === 0)?.map((channel) => ({ label: channel?.name, value: channel?.id })) : []}
            className="basic-multi-select"
            classNamePrefix="friday-deck-select"
            onChange={handleChannelsListChanged}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="pink" variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="pink" onClick={handleSendMessage} isLoading={sendingMessage}>
            Send message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SendMessageModal
