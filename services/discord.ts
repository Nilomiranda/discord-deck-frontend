import { httpClient } from '../config/queryClient'

const DISCORD_MESSAGE_LINK_BASE_URL = 'https://discord.com/channels'

export const sendMessage = async (channelsIds: string[], content: string, ownerChannelId: string, guildId: string, replyingToMessageId?: string) => {
  if (!channelsIds?.length) {
    return
  }

  const mappedPayload = channelsIds?.map((channelId) => {
    const formattedPayload = { channelId }

    if (channelId === ownerChannelId && replyingToMessageId) {
      // attach reply reference to message's owner channel
      Object.assign(formattedPayload, { replyingToMessageId, content })
    } else if (channelId !== ownerChannelId && replyingToMessageId) {
      // attach message link to message content since you can only send a reply in the same channel as the message being replied
      Object.assign(formattedPayload, { content: `${content} ${DISCORD_MESSAGE_LINK_BASE_URL}/${guildId}/${ownerChannelId}/${replyingToMessageId}` })
    } else {
      Object.assign(formattedPayload, { content })
    }

    return formattedPayload
  })
  return httpClient?.post('/discord/channels/messages', { data: mappedPayload })
}
