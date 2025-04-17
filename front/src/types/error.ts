export interface ApiError {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
  response?: {
    data?: {
      message?: string
      errors?: Record<string, string[]>
    }
    status?: number
  }
}
