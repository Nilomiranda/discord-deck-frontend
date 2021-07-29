import {VStack, SlideFade, Text, Button} from '@chakra-ui/react'
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import { IoArrowBackOutline } from 'react-icons/io5'
import {DiscordGuild} from "../../../interfaces/discordGuild";
import GuildChannelsList from "../GuildChannelsList";
import GuildsList from "../../GuildsList";

const SidebarButtons = () => {
  const [isViewingChannels, setIsViewingChannels] = useState(false)
  const [currentViewingGuild, setCurrentViewingGuild] = useState<DiscordGuild>(null)

  const handleGuildClick = (guild: DiscordGuild) => {
    setCurrentViewingGuild(guild)
    setIsViewingChannels(true)
  }

  return (
    <>
      { !isViewingChannels ?
        (
          <GuildsList handleGuildClick={handleGuildClick} />
        ) : (
          <SlideFade in={isViewingChannels} offset={"1.5rem"}>
            <Button leftIcon={<IoArrowBackOutline/>} pl={"0.75rem"} size={"md"} variant="link" colorScheme="pink" onClick={() => setIsViewingChannels(false)}>Servers</Button>
            <GuildChannelsList guildId={currentViewingGuild?.id} />
          </SlideFade>
        )
      }
    </>
  )
}

export default SidebarButtons
