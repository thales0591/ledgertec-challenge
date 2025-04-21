import { Injectable } from '@nestjs/common'
import { DocumentRepostiory } from '../document.repository'

@Injectable()
export class FetchAllDocumentsUseCase {
  constructor(private documentRepostiory: DocumentRepostiory) {}

  async execute(page: number) {
    const limit = 5
    const skip = (page - 1) * limit

    const { documents, totalCount, pageCount } =
      await this.documentRepostiory.findAll(limit, skip)

    return {
      data: documents,
      total: totalCount,
      page,
      pageCount,
    }
  }
}
