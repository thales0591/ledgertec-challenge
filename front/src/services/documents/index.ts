import api from '../api'
import {
  CreateDocumentReq,
  CreateDocumentResp,
  Document,
  FetchData,
  IngestStatus,
  TransferStatus,
  UpdateDocument,
  UploadDocumentResponse,
} from './interface'

export const fetchAllDocuments = async (
  pageIndex: number,
): Promise<FetchData> => {
  const { data } = await api.get<FetchData>(`/document/?page=${pageIndex}`)
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

export const downloadDocument = async (id: string) => {
  const response = await api.get(`/document/download/${id}`, {
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `document-${id}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.remove()
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
