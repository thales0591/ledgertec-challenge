import { Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'

@Injectable()
export class FetchAllDocumentsUseCase {
  constructor(private documentRepostiory: DocumentRepostiory) {}

  async execute() {
    return await this.documentRepostiory.findAll()
  }
}
