import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { UploadDocumentUseCase } from './use-cases/upload-document.usecase'
import { UploadDto } from './dto/upload-document.dto'
import { JwtAuthGuard } from 'src/commons/guard/jwt-auth.guard'

@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private uploadDocumentUseCase: UploadDocumentUseCase) {}

  @Post('')
  async upload(@Body() { name }: UploadDto) {
    return this.uploadDocumentUseCase.execute(name)
  }
}
