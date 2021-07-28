export interface User {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  flags: number
  bot: boolean
  banner: any
  banner_color: any
  accent_color: any
  bio: string
  locale: string
  mfa_enabled: boolean
  email: string
  verified: boolean
}
