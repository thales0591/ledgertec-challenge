import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'

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

export class UpdateDocumentDto {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  preservationDate?: Date

  @IsOptional()
  @IsEnum(PreservationStatus)
  preservationStatus?: PreservationStatus

  @IsOptional()
  @IsString()
  author?: string

  @IsOptional()
  @IsString()
  uniqueIdentifier?: string

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType

  @IsOptional()
  @IsEnum(LanguageOptions)
  language?: LanguageOptions

  @IsOptional()
  @IsString()
  transferId?: string

  @IsOptional()
  @IsString()
  ingestId?: string
}
