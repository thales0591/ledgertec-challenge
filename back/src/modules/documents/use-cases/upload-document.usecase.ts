import { Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'

@Injectable()
export class UploadDocumentUseCase {
  constructor(private documentRepostiory: DocumentRepostiory) {}

  async execute(name: string) {
    return this.documentRepostiory.createDocument(name)
  }
}
