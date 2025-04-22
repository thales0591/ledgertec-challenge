import { LanguageOptions } from '@/services/documents/interface'
import { z } from 'zod'

export const updateDocumentSchema = z.object({
  name: z
    .string()
    .min(3, 'Please type a document name with more then 3 characters')
    .optional(),
  author: z.string().optional(),
  uniqueIdentifier: z.string().optional(),
  documentType: z.string(),
  language: z.nativeEnum(LanguageOptions),
})

export type UpdateDocumentFormData = z.infer<typeof updateDocumentSchema>
