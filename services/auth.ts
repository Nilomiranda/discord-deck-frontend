import {httpClient} from "../config/queryClient";

export const login = async (email: string, password: string) => {
  return httpClient?.post('/auth/login', { email, password })
}

export const logout = async () => {
  return httpClient?.delete('/auth/logout')
}
