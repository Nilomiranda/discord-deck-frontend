import { Box, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useContext, useEffect } from 'react'
import ChannelCard from './ChannelCard'
import { useSelectedChannelsStore } from '../stores/selectedChannelsStore'
import { GuildChannel } from '../interfaces/guildChannel'
import { UserContext } from '../contexts/CurrentUser'

const SelectedChannels = () => {
  const addChannelsFromLocalStorage = useSelectedChannelsStore((state) => state?.addChannelsFromLocalStorage)
  const { user } = useContext(UserContext)
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${user?.guildID}`, { enabled: !!user?.guildID })

  const selectedChannels = useSelectedChannelsStore((state) => state.channels)

  const verifySavedPreviouslySavedChannels = (channels: GuildChannel[] = []) => {
    const previouslySelectedChannelsIds = JSON.parse(window?.localStorage?.getItem('SAVED_SELECTED_CHANNELS') || '[]')

    if (previouslySelectedChannelsIds?.length) {
      const previouslySelectedChannels: GuildChannel[] = previouslySelectedChannelsIds?.map((channelId) => channels?.find((channel) => channel?.id === channelId))

      console.log('previouslySelectedChannels', previouslySelectedChannels)

      addChannelsFromLocalStorage(previouslySelectedChannels)
    }
  }

  useEffect(() => {
    if (channelsData?.channels?.length) {
      verifySavedPreviouslySavedChannels(channelsData?.channels)
    }
  }, [channelsData])

  return (
    <Box display="flex" alignItems="stretch" justifyContent="flex-start" h="100%" width="100%" overflowX="auto">
      {selectedChannels?.length ? (
        selectedChannels?.map((selectedChannel) => (
          <Box mr="1rem">
            <ChannelCard channel={selectedChannel} key={selectedChannel.id} />
          </Box>
        ))
      ) : (
        <Text color="white">No channels selected. Select one in the left sidebar.</Text>
      )}
    </Box>
  )
}

export default SelectedChannels
