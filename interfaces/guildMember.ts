import { DiscordUser } from './user'
import { GuildRole } from './guildRole'

export interface GuildMember {
  user?: DiscordUser
  nick?: string
  roles: GuildRole[]
  joined_at?: string
  premium_since?: string
  deaf?: boolean
  mute?: boolean
  pending?: boolean
  permissions?: string
}
