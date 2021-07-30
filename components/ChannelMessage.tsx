import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {Text} from "@chakra-ui/react";

interface ChannelMessageProps {
  message: ChannelMessageType
}

const ChannelMessage = ({ message }: ChannelMessageProps) => {
  if (!message) {
    return
  }

  return <Text color={"white"}>{message?.content}</Text>
}

export default ChannelMessage
