import {
  Body,
  Controller,
  Post,
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

interface UploadedFileWithPath extends Express.Multer.File {
  filename: string
  path: string
}

@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private createDocumentUseCase: CreateDocumentUseCase) {}

  @Post('')
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

          // pega o nome sem extensão
          const originalNameWithoutExt = path.parse(file.originalname).name
          const folderPath = path.join(uploadsRoot, originalNameWithoutExt)

          // cria a pasta se não existir
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
}
