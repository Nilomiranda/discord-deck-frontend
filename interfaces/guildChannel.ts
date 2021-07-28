export interface GuildChannel {
  id: string
  type: number
  name: string
  position: number
  parent_id: string
  guild_id: string
  permission_overwrites: any[]
  nsfw: boolean
}
