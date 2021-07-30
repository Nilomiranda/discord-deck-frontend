import {GuildChannel} from "../interfaces/guildChannel";
import {Box, Heading, Text, VStack, CloseButton} from "@chakra-ui/react";
import {useQuery, useQueryClient} from "react-query";
import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {useSelectedChannelsStore} from "../stores/selectedChannelsStore";
import {useEffect, useState} from "react";
import ChannelMessage from "./ChannelMessage";

interface ChannelCardProps {
  channel: GuildChannel
}

const ChannelCard = ({ channel }: ChannelCardProps) => {
  const queryClient = useQueryClient()
  const removeChannelFromList = useSelectedChannelsStore(state => state?.removeChannelFromList)
  const { data: messageData } = useQuery<{ messages: ChannelMessageType[] }>(`discord/channels/messages?channelId=${channel?.id}`, { enabled: !!channel?.id })

  const [messages, setMessages] = useState<ChannelMessageType[]>([])

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
    <Box h={"100%"} width={"400px"} overflowY={"scroll"} overflowX={"hidden"} position={"relative"}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} position={"fixed"} w={"400px"} bg={"gray.900"} py={"0.5rem"}>
        <Heading fontSize={"lg"} color={"gray.600"}>{channel.name}</Heading>
        <CloseButton color={"red" } onClick={() => removeChannelFromList(channel)} />
      </Box>

      <VStack spacing={"1rem"} mt={"5rem"}>
        { messages?.map(message => <ChannelMessage message={message} />) }
      </VStack>
    </Box>
  )
}

export default ChannelCard
