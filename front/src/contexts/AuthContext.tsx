import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { LoginFormData } from '@/schemas/login-schema'
import { useUser } from '@/hooks/useUser'
import {
  getAccessToken,
  login as authLogin,
  logout as authLogout,
} from '@/services/auth'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  loading: boolean
  login: (data: LoginFormData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const { getAndSetUser, user } = useUser()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = getAccessToken()
    return !!token
  })
  const [loading, setLoading] = useState(true)

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true)

      const result = await authLogin(data)

      if (result.success) {
        setIsAuthenticated(true)
        await getAndSetUser()
        navigate('/', { replace: true })
      } else {
        throw new Error(result.error || 'Credenciais inválidas')
      }
    } catch (error) {
      console.error('Error while trying to login: ', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    authLogout()
    setIsAuthenticated(false)
    setLoading(false)
    navigate('/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken()

      if (token) {
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]))
          const isExpired = tokenData.exp * 1000 < Date.now()

          if (isExpired) {
            logout()
            return
          }

          if (!user) {
            getAndSetUser()
          }
        } catch (error) {
          console.error('Error checking token expiration:', error)
        }
      }

      const newAuthState = !!token

      if (!newAuthState && isAuthenticated) {
        navigate('/login', { replace: true })
      }

      setIsAuthenticated(newAuthState)
      setLoading(false)
    }

    checkAuth()

    const interval = setInterval(checkAuth, 60000)

    window.addEventListener('storage', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
      clearInterval(interval)
    }
  }, [isAuthenticated, navigate, getAndSetUser, logout, user])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
