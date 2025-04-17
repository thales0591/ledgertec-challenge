import api from '../api'
import { User } from './interface'

export const getUserMetrics = async (): Promise<User> => {
  const { data } = await api.get<User>('/user/me')
  return data
}
