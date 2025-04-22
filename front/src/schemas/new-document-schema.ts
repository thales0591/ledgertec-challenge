import { z } from 'zod'

export const newDocumentSchema = z.object({
  name: z
    .string()
    .min(3, 'Please type a document name with more then 3 characters'),
  author: z.string().optional(),
  uniqueIdentifier: z.string().optional(),
  type: z.string(),
  language: z.string(),
  file: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: 'Select a valid file.',
    })
    .refine(
      (fileList) =>
        fileList instanceof FileList && fileList[0]?.type === 'application/pdf',
      {
        message: 'Only PDF files are allowed.',
      },
    )
    .refine(
      (fileList) =>
        fileList instanceof FileList && fileList[0]?.size < 10 * 1024 * 1024,
      {
        message: 'The file must be smaller than 10MB.',
      },
    ),
})

export type NewDocumentFormData = z.infer<typeof newDocumentSchema>
