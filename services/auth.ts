import {AxiosResponse} from "axios";
import {discordClient} from "../config/queryClient";

interface DiscordBearerTokenResponse {
  "access_token": string
  "expires_in": number
  "refresh_token": string
  "scope": string
  "token_type": string
}

export const getDiscordBearerToken = async (code: string, redirectUri: string): Promise<DiscordBearerTokenResponse | null | undefined> => {
  if (!code) {
    console.error('Missing required param -> code')
    return
  }

  if (!redirectUri) {
    console.error('Missing required param -> redirectUri')
    return
  }

  const discordClientId = process.env.DISCORD_APP_ID
  const discordSecret = process.env.DISCORD_APP_SECRET

  const data = `${encodeURI('grant_type')}=${encodeURI('authorization_code')}&${encodeURI('client_id')}=${encodeURI(discordClientId)}&${encodeURI('client_secret')}=${encodeURI(discordSecret)}&code=${encodeURI(code)}&${encodeURI('redirect_uri')}=${encodeURI(redirectUri)}`

  try {
    const response = await discordClient.post<DiscordBearerTokenResponse>('/v8/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return response?.data
  } catch (err) {
    console.log(err, err?.response)
    throw new Error('ERROR_GETTING_DISCORD_DATA')
  }
}
