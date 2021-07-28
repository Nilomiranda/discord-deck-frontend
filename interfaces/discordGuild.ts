import {DISCORD_GUILD_ICON_CDN_BASE_URL} from "../config/constants";

export interface DiscordGuild {
  icon: string
  id: string
  name: string
  owner: boolean
  permissions: number
  features: string[]
}

export const getGuildIconUrl = (guildId: string, guildIconId: string, imageFormat = 'png') => {
  return `${DISCORD_GUILD_ICON_CDN_BASE_URL}${guildId}/${guildIconId}.${imageFormat}`
}
