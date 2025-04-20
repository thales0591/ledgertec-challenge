import { BadRequestException, Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'
import { UpdateDocumentDto } from '../dto/update-document.dto'

@Injectable()
export class UpdateDocumentUseCase {
  constructor(private documentRepostiory: DocumentRepostiory) {}

  async execute(data: UpdateDocumentDto) {
    const doesExists = await this.documentRepostiory.findById(data.id)

    if (!doesExists) {
      throw new BadRequestException('That is not a valid document id.')
    }

    const updatedDocument = await this.documentRepostiory.updateDocument(data)

    return updatedDocument
  }
}
