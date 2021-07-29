import {GuildChannel} from "../../interfaces/guildChannel";
import ServerButton from "../ServerButton";
import {VStack} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import ChannelButton from "../ChannelButton";

interface GuildChannelsListProps {
  guildId: string
}

const GuildChannelsList = ({ guildId }: GuildChannelsListProps) => {
  // const [channels, setChannels] = useState<GuildChannel[]>([])
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${guildId}`, { enabled: !!guildId })


  if (!guildId) {
    return null
  }

  return (
    <VStack mt="3rem" spacing="1.5rem" maxHeight={"79vh"} overflowY={"scroll"}>
      { channelsData?.channels?.length ? channelsData?.channels?.map(channel => <ChannelButton channel={channel} key={channel?.id} />) : null }
    </VStack>
  )
}

export default GuildChannelsList
