import {DISCORD_USER_AVATAR_CDN_BASE_URL} from "../config/constants";

export interface User {
  guildName: string;
  guildID: string;
  password: string;
  email: string;
  subscriptionID: string
}

export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  flags: number
  bot: boolean
  banner: any
  banner_color: any
  accent_color: any
  bio: string
  locale: string
  mfa_enabled: boolean
  email: string
  verified: boolean
}

export const getUserAvatar = (discordUser: DiscordUser): string => {
  return `${DISCORD_USER_AVATAR_CDN_BASE_URL}/${discordUser?.id}/${discordUser?.avatar}.png`
}
