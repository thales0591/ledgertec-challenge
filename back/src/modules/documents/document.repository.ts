import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadDto } from './dto/upload-document.dto'

@Injectable()
export class DocumentRepostiory {
  constructor(private prisma: PrismaService) {}

  async createDocument({
    name,
    author,
    documentType,
    language,
    uniqueIdentifier,
    pdfFilePath,
  }: UploadDto) {
    return await this.prisma.document.create({
      data: {
        name,
        author,
        documentType,
        language,
        uniqueIdentifier,
        pdfFilePath,
      },
    })
  }

  async findByName(name: string) {
    return await this.prisma.document.findFirst({
      where: {
        name,
      },
    })
  }
}
