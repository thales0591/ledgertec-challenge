import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import { toastErrorStyle } from '@/lib/toast-error-style'
import { ApiError } from '@/types/error'
import SelectBox from '@/components/ui/selectBox'
import {
  NewDocumentFormData,
  newDocumentSchema,
} from '@/schemas/new-document-schema'
import { createDocument, uploadDocument } from '@/services/documents'
import { useMutation } from '@tanstack/react-query'
import { toastSuccessStyle } from '@/lib/toast-success-style'
import { useNavigate } from 'react-router-dom'

export function NewDocumentForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof newDocumentSchema>>({
    resolver: zodResolver(newDocumentSchema),
  })

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onError: () => {
      toast.error(
        'Ocurred an error while uploading your document :(',
        toastErrorStyle,
      )
    },
  })

  const craeteMutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success('Document created successfully!', toastSuccessStyle)
      reset()
      navigate('/')
    },
    onError: () => {
      toast.error(
        'Ocurred an error while creating your document :(',
        toastErrorStyle,
      )
    },
  })

  async function onSubmit(data: NewDocumentFormData) {
    try {
      const uploadRes = await uploadMutation.mutateAsync(data.file[0])

      craeteMutation.mutate({
        name: data.name,
        documentType: data.type,
        language: data.language,
        pdfFilePath: uploadRes.path,
        ...(data.author && { author: data.author }),
        ...(data.uniqueIdentifier && {
          uniqueIdentifier: data.uniqueIdentifier,
        }),
      })
    } catch (error) {
      const errorMessage =
        (error as ApiError)?.response?.data?.message ??
        'Erro ao tentar criar o documento'
      toast.error(errorMessage, toastErrorStyle)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full items-center flex justify-center"
    >
      <Card className="w-4xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-[#1d93a0]">
            Upload new document
          </CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <h3>
              Fill your document informations and start to preserve it rigth
              now!
            </h3>
            <div className="flex gap-1">
              <h3 className="font-semibold">OBS:</h3>
              <h3>Only name and uploaded file are required.</h3>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-3 w-2/5">
              <Label htmlFor="name">Document name</Label>
              <Input
                id="name"
                placeholder="My new document"
                {...register('name')}
              />
              <span className="text-sm text-destructive block min-h-[1.25rem]">
                {errors.name?.message ?? ' '}
              </span>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="John Doe"
                type="author"
                {...register('author')}
              />
              {errors.author?.message && (
                <span className="text-sm text-destructive block">
                  {errors.author.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-3 w-2/5">
              <Label htmlFor="uniqueIdentifier">Unique Identifier</Label>
              <Input
                id="uniqueIdentifier"
                placeholder="84372-34"
                type="uniqueIdentifier"
                {...register('uniqueIdentifier')}
              />
              {errors.uniqueIdentifier?.message && (
                <span className="text-sm text-destructive">
                  {errors.uniqueIdentifier.message}
                </span>
              )}
              <Label htmlFor="type" className="mt-8">
                Document Type
              </Label>
              <SelectBox
                id="type"
                options={[
                  {
                    label: 'Generic',
                    value: 'GENERIC',
                  },
                  {
                    label: 'Contract',
                    value: 'CONTRACT',
                  },
                  {
                    label: 'Invoice',
                    value: 'INVOICE',
                  },
                  {
                    label: 'Letter',
                    value: 'LETTER',
                  },
                  {
                    label: 'Report',
                    value: 'REPORT',
                  },
                ]}
                className="w-1/2"
                {...register('type')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <Label htmlFor="language">Language</Label>
            <SelectBox
              id="language"
              options={[
                {
                  label: 'Portuguese',
                  value: 'PORTUGUESE',
                },
                {
                  label: 'English',
                  value: 'ENGLISH',
                },
              ]}
              className="w-1/2"
              {...register('language')}
            />
          </div>
          <div className="my-5 flex flex-col gap-2">
            <Label htmlFor="file">File selected</Label>
            <Input
              id="file"
              placeholder="84372-34"
              type="file"
              accept=".pdf"
              {...register('file')}
            />
            {typeof errors.file?.message === 'string' && (
              <span className="text-sm text-destructive">
                {errors.file.message}
              </span>
            )}
          </div>
          <div className="w-full flex justify-around">
            <Button type="submit" className="bg-[#25C1D1] hover:bg-[#1C9FA5]">
              Start preservation
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
