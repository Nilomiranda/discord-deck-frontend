import create from 'zustand'
import { GuildChannel } from '../interfaces/guildChannel'

interface HiddenChannelsState {
  channels: GuildChannel[]
  // eslint-disable-next-line no-unused-vars
  addChannelsToHiddenList: (channel: GuildChannel) => void
  // eslint-disable-next-line no-unused-vars
  removeChannelsFromHiddenList: (channelId: string) => void
  // eslint-disable-next-line no-unused-vars
  addChannelsFromLocalStorage: (channel: GuildChannel[]) => void
  // todo use with a RESET button
  clearHiddenChannelsList: () => void
}

const updateLocalStorage = (channelId: string, action: 'ADD' | 'REMOVE') => {
  if (!channelId) {
    return
  }

  const savedChannelsIds: string[] = JSON.parse(window?.localStorage?.getItem('SAVED_HIDDEN_CHANNELS') || '[]')

  let updatedSavedChannelsIds: string[] = []
  if (action === 'ADD') {
    updatedSavedChannelsIds = savedChannelsIds?.concat(channelId)
  } else {
    updatedSavedChannelsIds = savedChannelsIds?.filter((savedId) => savedId !== channelId)
  }

  window?.localStorage?.setItem('SAVED_HIDDEN_CHANNELS', JSON.stringify(updatedSavedChannelsIds))
}

export const useHiddenChannelsStore = create<HiddenChannelsState>((set) => ({
  channels: [],
  addChannelsToHiddenList: (channel: GuildChannel) =>
    set((state) => {

      const channelAlreadySelected = (state as any)?.channels?.find((currentAddedChannel) => currentAddedChannel?.id === channel?.id)
      if (!channelAlreadySelected) {
        const channelId = channel?.id
        updateLocalStorage(channelId, 'ADD')

        return { channels: state?.channels?.concat(channel) }
      }
    }),
  removeChannelsFromHiddenList: (channelId: string) =>
    set((state) => {
      updateLocalStorage(channelId, 'REMOVE')

      return {
        channels: state?.channels?.filter((selectedChannel) => selectedChannel?.id !== channelId),
      }
    }),
  addChannelsFromLocalStorage: (channels: GuildChannel[]) =>
    set(() => ({
      channels: [...channels],
    })),
  clearHiddenChannelsList: () =>
    set(() => {
      window?.localStorage?.setItem('SAVED_HIDDEN_CHANNELS', JSON.stringify([]))

      return {
        channels: [],
      }
    }),
}))
