import {
  BadRequestException,
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
import { pipeline } from 'stream'
import { promisify } from 'util'

interface UploadedFileWithPath extends Express.Multer.File {
  filename: string
  path: string
}

const streamPipeline = promisify(pipeline)

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
      const fileUrl = `http://localhost:62080/archival-storage/download/aip/${id}/`
      console.log('Requesting file from:', fileUrl)

      const response = await this.archivematicaRepository.downloadFile(fileUrl)
      console.log('Received response:', response)

      res.setHeader('Content-Type', 'application/zip')
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="document-${id}.zip"`,
      )

      // Verificando o tipo de stream
      if (response.data.constructor.name === 'IncomingMessage') {
        console.log('Stream is valid!')

        // Verificar antes do streaming
        const contentLength = response.headers['content-length']
        console.log('Content-Length:', contentLength)

        // Stream para o response
        await streamPipeline(response.data, res)

        console.log('Stream completed successfully')
      } else {
        console.error('Invalid stream received.')
        throw new BadRequestException('Received invalid stream')
      }
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
