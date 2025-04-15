import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { UploadDocumentUseCase } from './use-cases/upload-document.usecase'
import { DocumentRepostiory } from './document.repository'
import { JwtStrategy } from 'src/commons/strategy/jwt.strategy'

@Module({
  controllers: [DocumentController],
  providers: [UploadDocumentUseCase, DocumentRepostiory, JwtStrategy],
})
export class DocumentModule {}
