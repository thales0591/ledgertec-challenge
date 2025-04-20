enum PreservationStatus {
  STARTED = 'STARTED',
  PRESERVED = 'PRESERVED',
  FAILED = 'FAILED',
}

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
  preservationStatus: string
  author: string | null
  uniqueIdentifier: string | null
  documentType: string
  language: string
  pdfFilePath: string
  createdAt: Date
  updatedAt: Date
  transferId: string
  ingestId: string
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
  status: string
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
  status: 'COMPLETE' | 'IN_PROGRESS' | 'FAILED'
  message: string
}

export interface UpdateDocument {
  id: string
  name?: string
  preservationDate?: Date
  preservationStatus?: PreservationStatus
  author?: string
  uniqueIdentifier?: string
  documentType?: DocumentType
  language?: LanguageOptions
  transferId?: string
  ingestId?: string
}
