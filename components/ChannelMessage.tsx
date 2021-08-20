import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";
import {
  Avatar,
  Box, Button,
  Link,
  Text, useToast,
} from "@chakra-ui/react";
import {getUserAvatar} from "../interfaces/user";
import {format, parseISO} from "date-fns";
import {discordColorMap, TOAST_DEFAULT_DURATION} from "../config/constants";
import {GuildChannel} from "../interfaces/guildChannel";
import {sendMessage} from "../services/discord";
import {useContext, useState} from "react";
import {GuildRole} from "../interfaces/guildRole";
import {UserContext} from "../contexts/CurrentUser";

interface ChannelMessageProps {
  message: ChannelMessageType
  channel?: GuildChannel
  pingRolesShortcut?: boolean
  presetRoles?: GuildRole[];
  // eslint-disable-next-line no-unused-vars
  onMessageClick?: (message: ChannelMessageType) => void
  scrollable?: boolean
}

const ChannelMessage = ({ message, channel, onMessageClick = () => null, scrollable = false, pingRolesShortcut = true, presetRoles = [] }: ChannelMessageProps) => {
  const toast = useToast()
  const { user } = useContext(UserContext)

  const [pinging, setPinging] = useState(false)

  if (!message) {
    return
  }

  const handlePingRoles = async (event) => {
    event?.stopPropagation()
    const mappedRolesToMentionString = presetRoles?.length ? presetRoles?.map((presetRole) => `<@&${presetRole?.id}>`)?.join(' ') : ''

    const content = `${mappedRolesToMentionString}`

    try {
      setPinging(true)
      await sendMessage([channel?.id], content, channel?.id, user?.guildID, message?.id)

      toast({
        status: 'success',
        description: `Roles pinged`,
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } catch (err) {
      toast({
        status: 'error',
        description: `We couldn't ping these roles at the moment. Please try again later.`,
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } finally {
      setPinging(false)
    }
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

        { pingRolesShortcut ?
          (<Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"} w={"100%"} mt={"1.5rem"}>
            <Button size="sm"  variant={"link"} colorScheme={"pink"} onClick={handlePingRoles} isLoading={pinging}>Ping roles</Button>
          </Box>) : null
        }
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

      { pingRolesShortcut ?
        (<Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"} w={"100%"} mt={"1.5rem"}>
          <Button size="sm"  variant={"link"} colorScheme={"pink"} onClick={handlePingRoles} isLoading={pinging}>Ping roles</Button>
        </Box>) : null
      }
    </Box>
  )
}

export default ChannelMessage
