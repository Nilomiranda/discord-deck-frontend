import { createContext, useState } from 'react'
import { useQuery } from 'react-query'
import { User } from '../interfaces/user'

interface UserContextTypes {
  user: User
  newAccount: boolean
  // eslint-disable-next-line no-unused-vars
  setIsNewAccount: (value?: boolean) => void
}

export const UserContext = createContext<UserContextTypes>({
  user: null,
  newAccount: false,
  setIsNewAccount: () => null,
})

const UserProvider = ({ children }) => {
  const [isNewAccount, setIsNewAccount] = useState(false)

  const { data: userData } = useQuery<{ user: User }>('sessions')

  const toggleNewAccountCreated = (value: boolean) => {
    setIsNewAccount(value)
  }

  return <UserContext.Provider value={{ user: userData?.user, newAccount: isNewAccount, setIsNewAccount: toggleNewAccountCreated }}>{children}</UserContext.Provider>
}

export default UserProvider
