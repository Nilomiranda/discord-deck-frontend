import {GuildChannel} from "../interfaces/guildChannel";
import {
  Box,
  Heading,
  VStack,
  CloseButton,
} from "@chakra-ui/react";
import {useQuery, useQueryClient} from "react-query";
import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {useSelectedChannelsStore} from "../stores/selectedChannelsStore";
import {useEffect, useState} from "react";
import ChannelMessage from "./ChannelMessage";
import SendMessageModal from "./SendMessageModal";

interface ChannelCardProps {
  channel: GuildChannel
}

const ChannelCard = ({ channel }: ChannelCardProps) => {
  const queryClient = useQueryClient()
  const removeChannelFromList = useSelectedChannelsStore(state => state?.removeChannelFromList)
  const { data: messageData } = useQuery<{ messages: ChannelMessageType[] }>(`discord/channels/messages?channelId=${channel?.id}`, { enabled: !!channel?.id })

  const [messages, setMessages] = useState<ChannelMessageType[]>([])
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<ChannelMessageType>(null)

  const handleMessageClick = (message: ChannelMessageType) => {
    setSelectedMessage(message)
    setIsMessageModalOpen(true)
  }

  const handleSelectedMessageModalClosed = () => {
    setIsMessageModalOpen(false)
    setSelectedMessage(null)
  }

  useEffect(() => {
    if (messageData?.messages?.length) {
      setMessages(messageData?.messages?.reverse())
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
      <Box h={"100%"} width={"400px"} overflowX={"hidden"} overflowY={"hidden"}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} w={"400px"} bg={"gray.900"} py={"0.5rem"}>
          <Heading fontSize={"lg"} color={"gray.600"}>{channel.name}</Heading>
          <CloseButton color={"red"} onClick={() => removeChannelFromList(channel)} />
        </Box>

        <VStack spacing={"1rem"} overflowY={"auto"} h={"100%"} pr={"0.75rem"} pb={"3.5rem"}>
          { messages?.filter(message => message?.content?.length)?.map(message => <ChannelMessage key={message?.id} message={message} onMessageClick={handleMessageClick} />) }
        </VStack>
      </Box>

      <SendMessageModal isOpen={isMessageModalOpen} onClose={handleSelectedMessageModalClosed} selectedMessage={selectedMessage} />
    </>
  )
}

export default ChannelCard
