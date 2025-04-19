import api from '../api'
import {
  CreateDocumentReq,
  CreateDocumentResp,
  UploadDocumentResponse,
} from './interface'

export const uploadDocument = async (
  file: File,
): Promise<UploadDocumentResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post<UploadDocumentResponse>(
    '/document/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return data
}

export const createDocument = async (
  docData: CreateDocumentReq,
): Promise<CreateDocumentResp> => {
  const { data } = await api.post<CreateDocumentResp>('/document', docData)
  return data
}
