import {createContext, useEffect} from 'react'
import { useQuery } from 'react-query'
import { User } from '../interfaces/user'

interface UserContextTypes {
  user: User
}

export const UserContext = createContext<UserContextTypes>({
  user: null,
})

const UserProvider = ({ children }) => {
  const { data: userData } = useQuery<{ user: User }>('users/me')

  return <UserContext.Provider value={{ user: userData?.user }}>{children}</UserContext.Provider>
}

export default UserProvider
