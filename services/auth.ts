import {httpClient} from "../config/queryClient";

export interface DiscordBearerTokenResponse {
  accessToken: string
  expiresIn: number
  refreshToken: string
  scope: string
  tokenType: string
}

export const fetchDiscordOauthUrl = async (redirectUri: string) => {
  if (!redirectUri) {
    console.error('Missing required param -> redirectUri')
    return
  }

  return httpClient?.post<{ url: string }>('/discord-oauth', { redirectUri })
}

export const fetchDiscordAccessToken = async (code: string, redirectUri: string) => {
  if (!redirectUri) {
    console.error('Missing required param -> redirectUri')
    return
  }

  if (!code) {
    console.error('Missing required param -> code')
    return
  }

  return httpClient?.post<DiscordBearerTokenResponse>('/discord-access-token', { code, redirectUri })
}
