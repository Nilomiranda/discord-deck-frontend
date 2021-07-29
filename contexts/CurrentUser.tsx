import {createContext, useEffect} from 'react'
import { useQuery } from 'react-query'
import {DiscordUser, User} from '../interfaces/user'

interface UserContextTypes {
  user: User
  discordUser: DiscordUser
}

export const UserContext = createContext<UserContextTypes>({
  user: null,
  discordUser: null,
})

const UserProvider = ({ children }) => {
  const { data: userData } = useQuery<{ user: User }>('users/me')
  const { data: discordUserData } = useQuery<{ user: DiscordUser }>('discord/me')

  return <UserContext.Provider value={{ user: userData?.user, discordUser: discordUserData?.user }}>{children}</UserContext.Provider>
}

export default UserProvider
