export type DocStatus = 'STARTED' | 'PRESERVED' | 'FAILED'

export enum DocumentType {
  GENERIC = 'GENERIC',
  CONTRACT = 'CONTRACT',
  INVOICE = 'INVOICE',
  LETTER = 'LETTER',
  REPORT = 'REPORT',
}

export enum LanguageOptions {
  PORTUGUESE = 'PORTUGUESE',
  ENGLISH = 'ENGLISH',
}

export interface UploadDocumentResponse {
  filename: string
  path: string
}

export interface CreateDocumentReq {
  name: string
  author?: string
  documentType: string
  language: string
  uniqueIdentifier?: string
  pdfFilePath: string
}
export interface Document {
  id: string
  name: string
  preservationDate: Date | null
  preservationStatus: DocStatus
  author: string | null
  uniqueIdentifier: string | null
  documentType: string
  language: LanguageOptions
  pdfFilePath: string
  createdAt: Date
  updatedAt: Date
  transferId: string
  ingestId: string
}

export interface FetchData {
  data: Document[]
  total: number
  page: number
  pageCount: number
}

export interface CreateDocumentResp {
  document: Document
  id: string
}

export interface TransferStatus {
  type: string
  path: string
  directory: string
  name: string
  uuid: string
  microservice: string
  status: 'PROCESSING' | 'COMPLETE' | 'FAILED' | 'REJECTED' | 'USER_INPUT'
  sip_uuid: string
  message: string
}

export interface IngestStatus {
  type: string
  path: string
  directory: string
  name: string
  uuid: string
  microservice: string
  status: 'COMPLETE' | 'PROCESSING' | 'FAILED'
  message: string
}

export interface UpdateDocument {
  id: string
  name?: string
  preservationDate?: Date
  preservationStatus?: DocStatus
  author?: string
  uniqueIdentifier?: string
  documentType?: DocumentType
  language?: LanguageOptions
  transferId?: string
  ingestId?: string
}
