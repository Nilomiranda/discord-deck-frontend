import create from 'zustand'
import { GuildChannel } from '../interfaces/guildChannel'

interface SelectedChannelState {
  channels: GuildChannel[]
  // eslint-disable-next-line no-unused-vars
  addChannelToList: (channel: GuildChannel) => void
  // eslint-disable-next-line no-unused-vars
  removeChannelFromList: (channelId: string) => void
  // eslint-disable-next-line no-unused-vars
  addChannelsFromLocalStorage: (channel: GuildChannel[]) => void
  clearSelectedChannels: () => void
}

const updateLocalStorage = (channelId: string, action: 'ADD' | 'REMOVE') => {
  if (!channelId) {
    return
  }

  const savedChannelsIds: string[] = JSON.parse(window?.localStorage?.getItem('SAVED_SELECTED_CHANNELS') || '[]')

  let updatedSavedChannelsIds: string[] = []
  if (action === 'ADD') {
    updatedSavedChannelsIds = savedChannelsIds?.concat(channelId)
  } else {
    updatedSavedChannelsIds = savedChannelsIds?.filter((savedId) => savedId !== channelId)
  }

  window?.localStorage?.setItem('SAVED_SELECTED_CHANNELS', JSON.stringify(updatedSavedChannelsIds))
}

export const useSelectedChannelsStore = create<SelectedChannelState>((set) => ({
  channels: [],
  addChannelToList: (channel: GuildChannel) =>
    set((state) => {
      const channelAlreadySelected = (state as any)?.channels?.find((currentAddedChannel) => currentAddedChannel?.id === channel?.id)
      if (!channelAlreadySelected) {
        const channelId = channel?.id
        updateLocalStorage(channelId, 'ADD')

        return { channels: state?.channels?.concat(channel) }
      }
    }),
  removeChannelFromList: (channelId: string) =>
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
  clearSelectedChannels: () =>
    set(() => ({
      channels: [],
    })),
}))
