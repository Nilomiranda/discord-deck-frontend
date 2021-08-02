import {DiscordUser} from "./user";

export interface ChannelMessage {
  id: string
  type: number
  content: string
  channel_id: string
  author: DiscordUser
  attachments: any[]
  embeds: {
    type: string
    title: string
    description: string
    color: number
    url?: string
    fields:
      {
        name: string
        value: string
        inline: boolean
      }[]
  }[]
  mentions:
    {
      id: string
      username: string
      avatar: string
      discriminator: string
      public_flags: number
    }[]
  mention_roles: any[]
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  timestamp: string
  edited_timestamp: string
  flags: number
  components: any[]
}
