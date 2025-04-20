import api from '../api'
import {
  CreateDocumentReq,
  CreateDocumentResp,
  Document,
  IngestStatus,
  TransferStatus,
  UpdateDocument,
  UploadDocumentResponse,
} from './interface'

export const fetchAllDocuments = async (): Promise<Document[]> => {
  const { data } = await api.get<Document[]>('/document')
  return data
}

export const getTranferStatus = async (id: string): Promise<TransferStatus> => {
  const { data } = await api.get<TransferStatus>(`/document/transfer/${id}`)
  return data
}

export const getIngestStatus = async (id: string): Promise<IngestStatus> => {
  const { data } = await api.get<IngestStatus>(`/document/ingest/${id}`)
  return data
}

export const createDocument = async (
  docData: CreateDocumentReq,
): Promise<CreateDocumentResp> => {
  const { data } = await api.post<CreateDocumentResp>('/document', docData)
  return data
}

export const updateDocument = async (
  docData: UpdateDocument,
): Promise<Document> => {
  const { data } = await api.put<Document>(`/document`, docData)
  return data
}

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
