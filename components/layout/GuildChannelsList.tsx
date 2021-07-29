import { Box, VStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useContext, useEffect, useState } from 'react'
import { GuildChannel } from '../../interfaces/guildChannel'
import ChannelButton from '../ChannelButton'
import SearchInput from '../form/SearchInput'
import { UserContext } from '../../contexts/CurrentUser'

const GuildChannelsList = () => {
  const { user } = useContext(UserContext)
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const [channelsOriginalList, setChannelsOriginalLit] = useState<GuildChannel[]>([])
  const [channels, setChannels] = useState<GuildChannel[]>([])

  const handleChannelsSearch = (searchParams: string) => {
    setChannels(channelsOriginalList?.filter((channel) => channel.name?.includes(searchParams)))
  }

  useEffect(() => {
    setChannelsOriginalLit(channelsData?.channels?.length ? [...channelsData?.channels] : [])
    setChannels(channelsData?.channels?.length ? [...channelsData?.channels] : [])
  }, [channelsData])

  return (
    <VStack mt="3rem" spacing="1.5rem" maxHeight="79vh" overflowY="scroll">
      <Box px="1.25rem" w="100%">
        <SearchInput onSearchChange={handleChannelsSearch} placeholder="Search channel" />
      </Box>

      {channels
        ?.filter((channel) => channel?.type === 0)
        ?.map((channel) => (
          <ChannelButton channel={channel} key={channel?.id} />
        ))}
    </VStack>
  )
}

export default GuildChannelsList
