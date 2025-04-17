import api from '../api'
import { CreateUserData, User } from './interface'

export const getUserMetrics = async (): Promise<User> => {
  const { data } = await api.get<User>('/user/me')
  return data
}

export const createUser = async (data: CreateUserData): Promise<void> => {
  await api.post('/user', data)
}
