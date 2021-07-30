import create from 'zustand'
import { GuildChannel } from '../interfaces/guildChannel'

interface SelectedChannelState {
  channels: GuildChannel[]
  // eslint-disable-next-line no-unused-vars
  addChannelToList: (channel: GuildChannel) => void
  // eslint-disable-next-line no-unused-vars
  removeChannelFromList: (channel: GuildChannel) => void
  // eslint-disable-next-line no-unused-vars
  addChannelsFromLocalStorage: (channel: GuildChannel[]) => void
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
    const selectedChannelIdToRemoveIndex = savedChannelsIds?.indexOf(channelId)

    if (selectedChannelIdToRemoveIndex > -1) {
      const safeCopy = [...savedChannelsIds]
      safeCopy?.splice(selectedChannelIdToRemoveIndex, 1)
      updatedSavedChannelsIds = [...safeCopy]
    }
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

        return { channels: (state as any)?.channels?.concat(channel) }
      }
    }),
  removeChannelFromList: (channel: GuildChannel) =>
    set((state) => {
      const channelToRemoveIndex = state?.channels?.findIndex((currentAddedChannel) => currentAddedChannel?.id === channel?.id)

      if (channelToRemoveIndex > -1) {
        const channelsListCopy = [...state?.channels]
        channelsListCopy?.splice(channelToRemoveIndex, 1)

        const channelToRemoveId = channel?.id
        updateLocalStorage(channelToRemoveId, 'REMOVE')

        return {
          channels: [...channelsListCopy],
        }
      }
    }),
  addChannelsFromLocalStorage: (channels: GuildChannel[]) =>
    set(() => ({
        channels: [...channels],
      })),
}))
