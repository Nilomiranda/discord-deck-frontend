import '../styles/globals.css'
import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '../config/queryClient'
import UserProvider from '../contexts/CurrentUser'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default MyApp
