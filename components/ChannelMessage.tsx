import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {Avatar, Box, Text} from "@chakra-ui/react";
import {getUserAvatar} from "../interfaces/user";
import {format, parseISO} from "date-fns";

interface ChannelMessageProps {
  message: ChannelMessageType
}

const ChannelMessage = ({ message }: ChannelMessageProps) => {
  if (!message) {
    return
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} padding={"1rem"} bg={"gray.800"} borderRadius={"0.75rem "}>
      <Box display={"flex"} alignItems={"flex-start"}>
        <Avatar name={message?.author?.username} src={getUserAvatar(message?.author)} mb={"1rem"} />
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          <Text color={"gray.300"} textAlign={"left"} fontSize={"sm"} ml={"1rem"}>{message?.author?.username}</Text>
          <Text color={"gray.500"} textAlign={"left"} fontSize={"xs"} ml={"1rem"}>{format(parseISO(message?.timestamp), 'PPpp')}</Text>
        </Box>
      </Box>
      <Text color={"white"} w={"100%"} textAlign={"left"} fontSize={"sm"}>{message?.content}</Text>
    </Box>
  )
}

export default ChannelMessage
