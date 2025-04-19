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

export interface CreateDocumentResp {
  id: string
}
