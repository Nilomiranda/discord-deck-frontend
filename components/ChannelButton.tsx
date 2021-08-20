import { Box, CloseButton, Text } from '@chakra-ui/react'
import { GuildChannel } from '../interfaces/guildChannel'
import { useSelectedChannelsStore } from '../stores/selectedChannelsStore'
import type { MouseEvent } from 'react'
import ChannelSettingsMenu from './ChannelSettingsMenu'

interface ChannelButtonProps {
  channel: GuildChannel
  // eslint-disable-next-line no-unused-vars
  onChannelClick: (channel: GuildChannel) => void
}

const ChannelButton = ({ channel, onChannelClick }: ChannelButtonProps) => {
  const selectedChannelsIds = useSelectedChannelsStore((state) => state.channels)?.map((selectedChannel) => selectedChannel?.id)
  const removeChannelFromList = useSelectedChannelsStore((state) => state?.removeChannelFromList)

  const handleChannelRemoval = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    removeChannelFromList(channel?.id)
  }

  if (!channel) {
    return null
  }

  return (
    <Box
      display="flex"
      cursor="pointer"
      justifyContent="flex-start"
      alignItems="center"
      _hover={{ background: 'gray.700' }}
      size="lg"
      bg={selectedChannelsIds?.includes(channel?.id) ? 'gray.700' : 'transparent'}
      paddingTop="0.75rem"
      paddingBottom="0.75rem"
      paddingLeft={0}
      paddingRight="0.5rem"
      color="white"
      w="90%"
      onClick={() => onChannelClick(channel)}
      borderRadius="0.375rem"
    >
      <Text color="white" ml="0.75rem">
        {channel?.name}
      </Text>

      <Box marginLeft="auto" display="flex" alignItems="center">
        <ChannelSettingsMenu channel={channel} />

        {selectedChannelsIds?.includes(channel?.id) ? <CloseButton color="red" onClick={(event) => handleChannelRemoval(event)} /> : null}
      </Box>
    </Box>
  )
}

export default ChannelButton
