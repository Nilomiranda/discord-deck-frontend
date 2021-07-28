import '../styles/globals.css'
import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '../config/queryClient'
import UserProvider from '../contexts/CurrentUser'
import {useRouter} from "next/router";
import MainAppLayout from "../components/layout/MainAppLayout";

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          { router?.pathname?.includes('/app') ? 
            (
              <MainAppLayout>
                <Component {...pageProps} />
            </MainAppLayout>
            )
             : <Component {...pageProps} />
          }
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default MyApp
