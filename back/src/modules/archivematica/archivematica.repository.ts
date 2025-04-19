import { Injectable } from '@nestjs/common'
import { StartTransferResponse } from './dto/start-transfer.dto'
import { ConfigService } from '@nestjs/config'
import { createArchivematicaClient } from 'src/commons/clients/archivematica-client'
import { AxiosInstance } from 'axios'

@Injectable()
export class ArchivematicaRepository {
  private client: AxiosInstance

  constructor(private readonly configService: ConfigService) {
    this.client = createArchivematicaClient(this.configService)
  }

  async createTransfer(name: string, path: string) {
    const base64Path = Buffer.from(path).toString('base64')

    const payload = {
      name,
      type: 'standard',
      processing_config: 'automated',
      accession: '',
      access_system_id: '',
      auto_approve: true,
      metadata_set_id: '',
      path: base64Path,
    }

    const response = await this.client.post<StartTransferResponse>(
      '/api/v2beta/package',
      payload,
    )

    return response.data
  }
}
