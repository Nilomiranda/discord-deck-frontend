import {Box, Heading, HStack, IconButton, Text, VStack, StackDivider} from "@chakra-ui/react";
import {IoArrowBack} from "react-icons/io5";
import Link from 'next/link'
import SettingsSection from "../../components/settings/SettingsSection";
import EditChannelsVisibility from "../../components/settings/EditChannelsVisibility";

const Settings = () => {
  return (
    <VStack spacing={"1.75rem"} alignItems={"start"}>
      <Link href={"/app/dashboard"}>
        <IconButton aria-label="Go back" fontSize={"2xl"} icon={<IoArrowBack />} color={"pink"} variant={"link"} />
      </Link>
      <Heading color={"white"}>Settings</Heading>

      <VStack divider={<StackDivider borderColor="gray.600" />}>
        <SettingsSection title="Channels visibility" description="Choose which channels should be shown in the sidebar">
          <Box mt={"3rem"}>
            <EditChannelsVisibility />
          </Box>
        </SettingsSection>
      </VStack>
    </VStack>
  )
}

export default Settings
