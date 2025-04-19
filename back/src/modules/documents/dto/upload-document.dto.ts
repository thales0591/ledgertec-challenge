import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

export class UploadDto {
  @IsNotEmpty()
  @IsString()
  name: string

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

  @IsNotEmpty()
  @IsString()
  pdfFilePath: string
}
