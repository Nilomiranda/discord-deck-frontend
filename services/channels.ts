import {httpClient} from "../config/queryClient";
import {AxiosResponse} from "axios";
import {ChannelRolesPreset} from "../interfaces/channelRolesPreset";

export const saveChannelPresetRoles = async (channelId: string, roles: string[]): Promise<AxiosResponse<{ savedPreset: ChannelRolesPreset }> | undefined> => {
  return httpClient?.post('/users/channels/presets/save', { channelId, roles });
}
