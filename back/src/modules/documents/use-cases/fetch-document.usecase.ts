import { Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'

@Injectable()
export class FetchDocumentUseCase {
  constructor(private documentRepostiory: DocumentRepostiory) {}

  async execute(id: string) {
    return await this.documentRepostiory.findById(id)
  }
}
