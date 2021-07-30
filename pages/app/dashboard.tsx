import {Box, Heading} from "@chakra-ui/react";
import SelectedChannels from "../../components/SelectedChannels";

const DashboardPage = () => {
  return (
      <Box h={"88vh"}>
        <Heading color={"white"}>Dashboard</Heading>

        <Box mt={"3rem"} h={"100%"} w={"100%"}>
          <SelectedChannels />
        </Box>
      </Box>
  )
}

export default DashboardPage
