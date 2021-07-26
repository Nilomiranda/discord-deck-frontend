import axios from 'axios'
import { QueryClient } from 'react-query'
import Router from 'next/router'

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

const getQueryParams = (params: Record<string, string | number | boolean> | null) => {
  if (!params) return ''

  const paramsKeys = Object.keys(params)

  let queryString = '?'

  paramsKeys.forEach((paramKey) => {
    const paramValue = params[paramKey]
    queryString = `${queryString}&${paramKey}=${paramValue}`
  })

  return queryString
}

const defaultQueryFunction = async ({ queryKey }) => {
  const baseEndpoint = typeof queryKey === 'object' ? queryKey[0] : queryKey

  const queryParams: string = getQueryParams(typeof queryKey === 'object' ? queryKey[1] : null)

  try {
    const { data } = await httpClient.get(`${baseEndpoint}${queryParams || ''}`)
    return data
  } catch (err) {
    if (err?.response?.status === 401 && !Router.pathname.includes('login') && !Router.pathname.includes('sign-up')) {
      await Router.push('/login')
    }
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
    },
  },
})
