import {GuildChannel} from "../../interfaces/guildChannel";
import ServerButton from "../ServerButton";
import {VStack} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";

interface GuildChannelsListProps {
  guildId: string
}

const GuildChannelsList = ({ guildId }: GuildChannelsListProps) => {
  const [channels, setChannels] = useState<GuildChannel[]>([])

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
