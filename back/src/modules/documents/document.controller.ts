import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { UploadDto } from './dto/upload-document.dto'
import { JwtAuthGuard } from 'src/commons/guard/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { CreateDocumentUseCase } from './use-cases/upload-document.usecase'
import * as path from 'path'
import * as fs from 'fs'
import { FetchAllDocumentsUseCase } from './use-cases/fetch-all-documents.usecase'
import { GetTransferStatusUseCase } from './use-cases/get-transfer-status.usecase'
import { GetIngestStatusUseCase } from './use-cases/get-ingest-status.usecase'
import { UpdateDocumentDto } from './dto/update-document.dto'
import { UpdateDocumentUseCase } from './use-cases/update-document.usecase'
import { FetchDocumentUseCase } from './use-cases/fetch-document.usecase'
import { ArchivematicaRepository } from '../archivematica/archivematica.repository'
import { Response } from 'express'

interface UploadedFileWithPath extends Express.Multer.File {
  filename: string
  path: string
}

@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly fetchAllDocumentsUseCase: FetchAllDocumentsUseCase,
    private readonly getTransferStatusUseCase: GetTransferStatusUseCase,
    private readonly getIngestStatusUseCase: GetIngestStatusUseCase,
    private readonly updateDocumentUseCase: UpdateDocumentUseCase,
    private readonly fetchDocumentUseCase: FetchDocumentUseCase,
    private readonly archivematicaRepository: ArchivematicaRepository,
  ) {}

  @Get()
  async findAll(@Query('page') page = '1') {
    const currentPage = parseInt(page, 10)
    return this.fetchAllDocumentsUseCase.execute(currentPage)
  }

  @Get('transfer/:id')
  async getTranferStatus(@Param('id') id: string) {
    return this.getTransferStatusUseCase.execute(id)
  }

  @Get('ingest/:id')
  async getIngestStatus(@Param('id') id: string) {
    return this.getIngestStatusUseCase.execute(id)
  }

  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return this.fetchDocumentUseCase.execute(id)
  }

  @Get('download/:id')
  async proxyArchivematicaDownload(
    @Param('id') id: string,
    @Res({ passthrough: false }) res: Response,
  ) {
    try {
      const fileUrl = `http://localhost:62081/api/v2/file/${id}/download/`

      const response = await this.archivematicaRepository.downloadFile(fileUrl)

      res.setHeader('Content-Type', 'application/x-7z-compressed')
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="document-${id}.7z"`,
      )

      response.data.pipe(res)
    } catch (error) {
      console.error('Erro no download:', error)
      throw new NotFoundException('Erro ao fazer o download do arquivo')
    }
  }

  @Post()
  async upload(@Body() documentData: UploadDto) {
    return this.createDocumentUseCase.execute(documentData)
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsRoot =
            'C:/Users/thale/Documentos/ArchivematicaShared/meusUploads'

          const originalNameWithoutExt = path.parse(file.originalname).name
          const folderPath = path.join(uploadsRoot, originalNameWithoutExt)

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
          }

          cb(null, folderPath)
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: UploadedFileWithPath) {
    const folderName = path.parse(file.originalname).name
    return {
      filename: file.originalname,
      path: `/home/meusUploads/${folderName}`,
    }
  }

  @Put()
  async updateDocument(@Body() data: UpdateDocumentDto) {
    return this.updateDocumentUseCase.execute(data)
  }
}
