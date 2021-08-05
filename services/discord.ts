import { httpClient } from '../config/queryClient'

export const sendMessage = async (channelsIds: string[], content: string, replyingToMessageId?: string) => {
  if (!channelsIds?.length) {
    return
  }

  const mappedPayload = channelsIds?.map(channelId => ({ channelId, content, replyingToMessageId }))
  return httpClient?.post('/discord/channels/messages', { data: mappedPayload })
}
