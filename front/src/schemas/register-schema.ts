import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3, 'Your name must be at least 3 characters long'),
  email: z.string().min(1, 'Please enter your email').email('Invalid e-mail'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
