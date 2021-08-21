import { Box, VStack, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useContext, useEffect, useState } from 'react'
import { GuildChannel } from '../../interfaces/guildChannel'
import ChannelButton from '../ChannelButton'
import SearchInput from '../form/SearchInput'
import { UserContext } from '../../contexts/CurrentUser'
import { useSelectedChannelsStore } from '../../stores/selectedChannelsStore'
import { useHiddenChannelsStore } from '../../stores/visibleChannelsStore'

const GuildChannelsList = () => {
  const addChannelToList = useSelectedChannelsStore((state) => state?.addChannelToList)
  const hiddenChannelsIds = useHiddenChannelsStore((state) => state?.channels)?.map((hiddenChannel) => hiddenChannel?.id)

  const { user } = useContext(UserContext)
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const [channelsOriginalList, setChannelsOriginalLit] = useState<GuildChannel[]>([])
  const [channels, setChannels] = useState<GuildChannel[]>([])

  const handleChannelsSearch = (searchParams: string) => {
    setChannels(channelsOriginalList?.filter((channel) => channel.name?.includes(searchParams)))
  }

  const handleChannelClicked = (clickedChannel: GuildChannel) => {
    if (!clickedChannel) {
      return
    }

    addChannelToList(clickedChannel)
  }

  useEffect(() => {
    setChannelsOriginalLit(channelsData?.channels?.length ? [...channelsData?.channels] : [])
    setChannels(channelsData?.channels?.length ? [...channelsData?.channels] : [])
  }, [channelsData])

  return (
    <VStack mt="3rem" spacing="1.5rem" maxHeight="70vh" overflowY="auto">
      <Box px="1.25rem" w="100%">
        <SearchInput onSearchChange={handleChannelsSearch} placeholder="Search channel" />
        {hiddenChannelsIds?.length ? (
          <Text mt="1rem" fontSize="xs" color="gray.600">
            Some channels are currently hidden
          </Text>
        ) : null}
      </Box>

      {channels
        ?.filter((channel) => channel?.type === 0)
        ?.filter((channel) => !hiddenChannelsIds?.includes(channel?.id))
        ?.map((channel) => (
          <ChannelButton channel={channel} key={channel?.id} onChannelClick={handleChannelClicked} />
        ))}
    </VStack>
  )
}

export default GuildChannelsList
