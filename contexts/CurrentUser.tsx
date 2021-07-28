import { createContext } from 'react'
import { useQuery } from 'react-query'
import cookies from 'js-cookie'
import { User } from '../interfaces/user'

interface UserContextTypes {
  user: User
}

export const UserContext = createContext<UserContextTypes>({
  user: null,
})

const UserProvider = ({ children }) => {
  const { data: userData } = useQuery<User>('users/@me', { enabled: !!cookies.get('DISCORD_ACCESS_TOKEN') })

  return <UserContext.Provider value={{ user: userData }}>{children}</UserContext.Provider>
}

export default UserProvider
