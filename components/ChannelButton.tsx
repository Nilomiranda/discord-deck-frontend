import {GuildChannel} from "../interfaces/guildChannel";
import {Button, Text} from "@chakra-ui/react";

interface ChannelButtonProps {
  channel: GuildChannel
}

const ChannelButton = ({ channel }: ChannelButtonProps) => {
  if (!channel) {
    return null
  }

  return (
    <Button _hover={{ background: 'gray.700' }} size="lg" height="48px" bg="transparent" color="white" w="90%">
      <Text color={"white"} ml={"0.75rem"}>{channel?.name}</Text>
    </Button>
  )
}

export default ChannelButton
