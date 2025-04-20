import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { DocumentRepostiory } from './document.repository'
import { JwtStrategy } from 'src/commons/strategy/jwt.strategy'
import { ArchivematicaRepository } from '../archivematica/archivematica.repository'
import { CreateDocumentUseCase } from './use-cases/upload-document.usecase'
import { ConfigService } from '@nestjs/config'
import { FetchAllDocumentsUseCase } from './use-cases/fetch-all-documents.usecase'
import { GetTransferStatusUseCase } from './use-cases/get-transfer-status.usecase'
import { GetIngestStatusUseCase } from './use-cases/get-ingest-status.usecase'
import { UpdateDocumentUseCase } from './use-cases/update-document.usecase'
import { FetchDocumentUseCase } from './use-cases/fetch-document.usecase'

@Module({
  controllers: [DocumentController],
  providers: [
    CreateDocumentUseCase,
    FetchAllDocumentsUseCase,
    GetTransferStatusUseCase,
    GetIngestStatusUseCase,
    UpdateDocumentUseCase,
    FetchDocumentUseCase,
    DocumentRepostiory,
    JwtStrategy,
    ArchivematicaRepository,
    ConfigService,
  ],
})
export class DocumentModule {}
