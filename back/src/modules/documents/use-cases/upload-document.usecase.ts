import { ConflictException, Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'
import { UploadDto } from '../dto/upload-document.dto'
import { ArchivematicaRepository } from 'src/modules/archivematica/archivematica.repository'

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    private documentRepostiory: DocumentRepostiory,
    private archivematicaRepository: ArchivematicaRepository,
  ) {}

  async execute({
    name,
    author,
    documentType,
    language,
    uniqueIdentifier,
    pdfFilePath,
  }: UploadDto) {
    const documentWithSameName = await this.documentRepostiory.findByName(name)

    if (documentWithSameName) {
      throw new ConflictException('Document with same name already exists.')
    }

    await this.documentRepostiory.createDocument({
      name,
      author,
      documentType,
      language,
      uniqueIdentifier,
      pdfFilePath,
    })

    return await this.archivematicaRepository.createTransfer(name, pdfFilePath)
  }
}
