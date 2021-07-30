import ChannelCard from "./ChannelCard";
import {HStack} from "@chakra-ui/react";
import {useSelectedChannelsStore} from "../stores/selectedChannelsStore";

const SelectedChannels = () => {
  const selectedChannels = useSelectedChannelsStore(state => state.channels)

  return (
    <HStack spacing={"1.25rem"} h={"100%"} w={"100%"} overflowX={"scroll"}>
      { selectedChannels?.length ?
        selectedChannels?.map(selectedChannel => <ChannelCard channel={selectedChannel} key={selectedChannel.id} />) : null
      }
    </HStack>
  )
}

export default SelectedChannels
