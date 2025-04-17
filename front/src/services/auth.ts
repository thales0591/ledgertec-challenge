/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios'
import { env } from '@/env'
import { LoginFormData } from '@/schemas/login-schema'
import toast from 'react-hot-toast'
import { toastSuccessStyle } from '@/lib/toast-success-style'
import { toastErrorStyle } from '@/lib/toast-error-style'

const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const saveToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = () => localStorage.getItem('accessToken')

const removeToken = () => {
  localStorage.removeItem('accessToken')
}

export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post('/auth/login', data)
    const { access_token } = response.data
    if (!access_token) {
      throw new Error('Tokens de autenticação não recebidos.')
    }

    saveToken(access_token)

    toast.success('Successfully loged in!', toastSuccessStyle)

    return { success: true }
  } catch (error) {
    let errorMessage = 'Error while trying to log in.'

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message

      toast.error(errorMessage, toastErrorStyle)
    }

    return { success: false, error: errorMessage }
  }
}

export const logout = () => {
  removeToken()
  toast('You have been disconnected.', {
    duration: 2000,
  })
}
