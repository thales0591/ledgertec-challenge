import { getUserMetrics } from '@/services/user'
import { User } from '@/services/user/interface'
import { createContext, useState, ReactNode } from 'react'

interface UserContextType {
  user: User | null
  getAndSetUser: () => Promise<void>
  loading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const getAndSetUser = async () => {
    try {
      const response = await getUserMetrics()
      setUser(response)
    } catch (error) {
      throw new Error('Erro ao buscar dados do usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        getAndSetUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
