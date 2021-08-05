import { Button, Text } from '@chakra-ui/react'
import { GuildChannel } from '../interfaces/guildChannel'

interface ChannelButtonProps {
  channel: GuildChannel
  // eslint-disable-next-line no-unused-vars
  onChannelClick: (channel: GuildChannel) => void
}

const ChannelButton = ({ channel, onChannelClick }: ChannelButtonProps) => {
  if (!channel) {
    return null
  }

  return (
    <Button _hover={{ background: 'gray.700' }} size="lg" bg="transparent" paddingTop="0.5rem" paddingBottom="0.5rem" color="white" w="90%" onClick={() => onChannelClick(channel)}>
      <Text color="white" ml="0.75rem">
        {channel?.name}
      </Text>
    </Button>
  )
}

export default ChannelButton
