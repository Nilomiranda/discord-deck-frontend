import {VStack, SlideFade, Text, Button} from '@chakra-ui/react'
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import { IoArrowBackOutline } from 'react-icons/io5'
import {DiscordGuild} from "../../../interfaces/discordGuild";
import ServerButton from "../../ServerButton";
import GuildChannelsList from "../GuildChannelsList";

const SidebarButtons = () => {
  const loadedServers = useQuery('users/@me/guilds')
  const [guilds, setGuilds] = useState<DiscordGuild[]>([])
  const [isViewingChannels, setIsViewingChannels] = useState(false)
  const [currentViewingGuild, setCurrentViewingGuild] = useState<DiscordGuild>(null)

  const handleGuildClick = (guild: DiscordGuild) => {
    setCurrentViewingGuild(guild)
    setIsViewingChannels(true)
  }

  useEffect(() => {
    console.log('servers', loadedServers)
    if (loadedServers?.data) {
      setGuilds(loadedServers?.data as DiscordGuild[])
    }
  }, [loadedServers])

  return (
    <>
      { !isViewingChannels ?
        (
          <VStack mt="3rem" spacing="1.5rem" maxHeight={"79vh"} overflowY={"scroll"}>
            { guilds?.map(guild => <ServerButton guild={guild} onGuildClick={handleGuildClick} />) }
          </VStack>
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
