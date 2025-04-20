import { Injectable } from '@nestjs/common'
import { ArchivematicaRepository } from 'src/modules/archivematica/archivematica.repository'

@Injectable()
export class GetTransferStatusUseCase {
  constructor(private archivematicaRepository: ArchivematicaRepository) {}

  async execute(id: string) {
    return await this.archivematicaRepository.getTransferStatus(id)
  }
}
