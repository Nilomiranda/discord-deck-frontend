import {GuildChannel} from "../../interfaces/guildChannel";
import ServerButton from "../ServerButton";
import {VStack} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";

interface GuildChannelsListProps {
  guildId: string
}

const GuildChannelsList = ({ guildId }: GuildChannelsListProps) => {
  const channelsData = useQuery(`guilds/${guildId}/channels`, { enabled: !!guildId })

  const [channels, setChannels] = useState<GuildChannel[]>([])

  useEffect(() => {
    if (channelsData?.data) {
      setChannels(channelsData?.data)
    }
  }, [channelsData])

  if (!guildId) {
    return null
  }

  if (!channels?.length) {
    return null
  }

  return (
    <VStack mt="3rem" spacing="1.5rem" maxHeight={"79vh"} overflowY={"scroll"}>
      { channels?.map(channel => <ChannelButton channel={channel} />) }
    </VStack>
  )
}

export default GuildChannelsList
