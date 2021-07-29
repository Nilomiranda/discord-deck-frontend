import ServerButton from "./ServerButton";
import {Box, VStack, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {DiscordGuild} from "../interfaces/discordGuild";
import SearchInput from "./form/SearchInput";
import {useEffect, useState} from "react";

interface GuildsListProps {
  // eslint-disable-next-line no-unused-vars
  handleGuildClick: (guild: DiscordGuild) => void
}

const GuildsList = ({ handleGuildClick }: GuildsListProps) => {
  const { data: guildsData } = useQuery<{ guilds: DiscordGuild[] }>('discord/guilds')
  const [guildsOriginalList, setGuildsOriginalList] = useState<DiscordGuild[]>([])
  const [guilds, setGuilds] = useState<DiscordGuild[]>([])

  const handleGuildSearch = (searchParams: string) => {
    setGuilds(guildsOriginalList?.filter(guild => guild.name?.includes(searchParams)))
  }

  useEffect(() => {
    setGuildsOriginalList(guildsData?.guilds?.length ? [...guildsData?.guilds] : [])
    setGuilds(guildsData?.guilds?.length ? [...guildsData?.guilds] : [])
  }, [guildsData])

  return (
    <VStack mt="3rem" spacing="1.5rem" maxHeight={"79vh"} overflowY={"scroll"}>
      <Box px={"1.25rem"} w={"100%"}>
        <SearchInput onSearchChange={handleGuildSearch} placeholder={"Search server"} />
      </Box>
      { guilds?.map(guild => <ServerButton key={guild?.id} guild={guild} onGuildClick={handleGuildClick} />) }

      { !guilds?.length ? <Text color={"gray.600"}>No guilds to show</Text> : null }
    </VStack>
  )
}

export default GuildsList
