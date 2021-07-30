import create from 'zustand'
import {GuildChannel} from "../interfaces/guildChannel";

interface SelectedChannelState {
  channels: GuildChannel[]
  // eslint-disable-next-line no-unused-vars
  addChannelToList: (channel: GuildChannel) => void,
  // eslint-disable-next-line no-unused-vars
  removeChannelFromList: (channel: GuildChannel) => void,
}

export const useSelectedChannelsStore = create<SelectedChannelState>(set => ({
  channels: [],
  addChannelToList: (channel: GuildChannel) => set(state => {
    const channelAlreadySelected = (state as any)?.channels?.find(currentAddedChannel => currentAddedChannel?.id === channel?.id)
    if (!channelAlreadySelected) {
      return { channels: (state as any)?.channels?.concat(channel) }
    }
  }),
  removeChannelFromList: (channel: GuildChannel) => set(state => {
    const channelToRemoveIndex = state?.channels?.findIndex(currentAddedChannel => currentAddedChannel?.id === channel?.id);

    if (channelToRemoveIndex > -1) {
      const channelsListCopy = [...state?.channels]
      channelsListCopy?.splice(channelToRemoveIndex, 1)
      return {
        channels: [...channelsListCopy]
      }
    }
  })
}))
