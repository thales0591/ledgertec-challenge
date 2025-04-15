import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DocumentRepostiory {
  constructor(private prisma: PrismaService) {}

  async createDocument(name: string) {
    return `Documento ${name} criado com sucesso.`
  }
}
