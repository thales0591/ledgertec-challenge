import axios from 'axios'
import { ConfigService } from '@nestjs/config'

export const createArchivematicaClient = (config: ConfigService) => {
  return axios.create({
    baseURL: 'http://localhost:62080',
    headers: {
      Authorization: `ApiKey ${config.get('ARCHIVEMATICA_API_KEY')}`,
    },
  })
}
