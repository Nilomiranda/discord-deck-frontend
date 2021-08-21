import {ReactNode} from "react";
import {Divider, Heading, VStack} from "@chakra-ui/react";

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
}

const SettingsSection = ({ children, title, description = "" }: SettingsSectionProps) => {
  return (
    <VStack alignItems={"start"}>
      <Heading color={"white"} fontSize={"lg"}>{title}</Heading>
      { description ? <Heading color={"gray.600"} fontSize={"sm"} fontStyle={"italic"}>{description}</Heading> : null }

      {children}
    </VStack>
  )
}

export default SettingsSection
