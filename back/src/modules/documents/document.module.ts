import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { DocumentRepostiory } from './document.repository'
import { JwtStrategy } from 'src/commons/strategy/jwt.strategy'
import { ArchivematicaRepository } from '../archivematica/archivematica.repository'
import { CreateDocumentUseCase } from './use-cases/upload-document.usecase'
import { ConfigService } from '@nestjs/config'

@Module({
  controllers: [DocumentController],
  providers: [
    CreateDocumentUseCase,
    DocumentRepostiory,
    JwtStrategy,
    ArchivematicaRepository,
    ConfigService,
  ],
})
export class DocumentModule {}
