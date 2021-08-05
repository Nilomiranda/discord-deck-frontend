import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {Avatar, Box, Link, Text} from "@chakra-ui/react";
import {getUserAvatar} from "../interfaces/user";
import {format, parseISO} from "date-fns";
import {discordColorMap} from "../config/constants";

interface ChannelMessageProps {
  message: ChannelMessageType
  // eslint-disable-next-line no-unused-vars
  onMessageClick?: (message: ChannelMessageType) => void
  scrollable?: boolean
}

const ChannelMessage = ({ message, onMessageClick = () => null, scrollable = false }: ChannelMessageProps) => {
  if (!message) {
    return
  }

  if (message?.embeds?.length) {
    const [embededMessage] = message?.embeds

    return (
      <Box as={"button"} display={"flex"} flexDirection={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} padding={"1rem"} bg={"gray.800"} borderRadius={"0.75rem "} onClick={() => onMessageClick(message)}>
        <Box display={"flex"} alignItems={"flex-start"}>
          <Avatar name={message?.author?.username} src={getUserAvatar(message?.author)} mb={"1rem"} />
          <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
            <Text color={"gray.300"} textAlign={"left"} fontSize={"sm"} ml={"1rem"}>{message?.author?.username}</Text>
            <Text color={"gray.500"} textAlign={"left"} fontSize={"xs"} ml={"1rem"}>{format(parseISO(message?.timestamp), 'PPpp')}</Text>
          </Box>
        </Box>

        <Box background={"#212938"} p={"0.5rem"} borderTopRightRadius={"0.5rem"} borderBottomRightRadius={"0.5rem"} borderLeftWidth={"3px"} borderLeftColor={discordColorMap[embededMessage?.color]} maxHeight={scrollable ? "200px" : "unset"} overflowY={"auto"}>
          <Text color={"white"} fontWeight={"bold"} w={"100%"} textAlign={"left"} fontSize={"lg"}>{embededMessage?.title}</Text>
          <Text color={"white"} fontWeight={"light"} w={"100%"} textAlign={"left"} fontSize={"sm"}>{embededMessage?.description}</Text>
          <Link color={"blue.400"} w={"100%"} textAlign={"left"} display={"block"} fontSize={"sm"} href={embededMessage?.url} target={"_blank"} rel={"noopener"} mt={"0.5rem"}>{embededMessage?.url}</Link>

          { embededMessage?.fields?.length ? embededMessage?.fields?.map((embededMessageField, index) => (
            <Box mt={"1rem"} key={index}>
              <Text w={"100%"} fontWeight={"bold"} textAlign={"left"} color={"white"}>{embededMessageField?.name}</Text>
              <Text w={"100%"} fontWeight={"light"} textAlign={"left"} color={"white"}>{embededMessageField?.value}</Text>
            </Box>
          )) : null }
        </Box>

      </Box>
    )
  }

  return (
    <Box as={"button"} display={"flex"} flexDirection={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} padding={"1rem"} bg={"gray.800"} borderRadius={"0.75rem "} onClick={() => onMessageClick(message)}>
      <Box display={"flex"} alignItems={"flex-start"}>
        <Avatar name={message?.author?.username} src={getUserAvatar(message?.author)} mb={"1rem"} />
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          <Text color={"gray.300"} textAlign={"left"} fontSize={"sm"} ml={"1rem"}>{message?.author?.username}</Text>
          <Text color={"gray.500"} textAlign={"left"} fontSize={"xs"} ml={"1rem"}>{format(parseISO(message?.timestamp), 'PPpp')}</Text>
        </Box>
      </Box>
      <Text color={"white"} w={"100%"} textAlign={"left"} fontSize={"sm"} maxHeight={scrollable ? "200px" : "unset"} overflowY={"auto"}>{message?.content}</Text>
    </Box>
  )
}

export default ChannelMessage
