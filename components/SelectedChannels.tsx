import ChannelCard from "./ChannelCard";
import {Box, Text} from "@chakra-ui/react";
import {useSelectedChannelsStore} from "../stores/selectedChannelsStore";

const SelectedChannels = () => {
  const selectedChannels = useSelectedChannelsStore(state => state.channels)

  return (
    <Box display={"flex"} alignItems={"stretch"} justifyContent={"flex-start"} h={"100%"} width={"100%"} overflowX={"auto"}>
      { selectedChannels?.length ?
        selectedChannels?.map(selectedChannel => (
          <Box mr={"1rem"}>
            <ChannelCard channel={selectedChannel} key={selectedChannel.id} />
          </Box>
        )) : (
          <Text color={"white"}>No channels selected. Select one in the left sidebar.</Text>
        )
      }
    </Box>
  )
}

export default SelectedChannels
