import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadDto } from './dto/upload-document.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'

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

  async findByIdentifier(uniqueIdentifier: string) {
    return await this.prisma.document.findFirst({
      where: {
        uniqueIdentifier,
      },
    })
  }

  async findAll() {
    return await this.prisma.document.findMany()
  }

  async findById(id: string) {
    return await this.prisma.document.findFirst({
      where: {
        id,
      },
    })
  }

  async updateDocument(data: UpdateDocumentDto) {
    return await this.prisma.document.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
