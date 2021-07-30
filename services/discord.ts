import { httpClient } from '../config/queryClient'

export const sendMessage = async (channelId: string, content: string, replyingToMessageId?: string) => httpClient?.post('/discord/channels/messages', { channelId, content, replyingToMessageId })
