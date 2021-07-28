import {Avatar, Button, Text} from "@chakra-ui/react";
import Link from "next/link";
import {DiscordGuild, getGuildIconUrl} from "../interfaces/discordGuild";

interface ServerButtonProps {
  guild: DiscordGuild
  onGuildClick: (guild: DiscordGuild) => void
}

const ServerButton = ({ guild, onGuildClick }: ServerButtonProps) => {
  if (!guild) {
    return
  }

  return (
      <Button _hover={{ background: 'gray.700' }} size="lg" height="48px" bg="transparent" color="white" w="90%" onClick={() => onGuildClick(guild)}>
        <Avatar name={guild.name} src={getGuildIconUrl(guild.id, guild.icon)} />
        <Text color={"white"} ml={"0.75rem"}>{guild?.name}</Text>
      </Button>
  )
}

export default ServerButton
