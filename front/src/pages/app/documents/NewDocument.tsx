import { Payment } from './columns'

export const payments: Payment[] = [
  {
    id: '728ed52f',
    name: 'Gestão de gastos',
    preservationDate: '14/09/2025',
    status: 'STARTED',
  },
  {
    id: '43d534d2f',
    name: 'Suprimentos de fundo',
    preservationDate: '14/09/2025',
    status: 'PRESERVED',
  },
  {
    id: '923sdgf',
    name: 'Autorizadores contratuais',
    preservationDate: '14/09/2025',
    status: 'PRESERVED',
  },
  {
    id: '32458e45d5g',
    name: 'Processos autônomos',
    preservationDate: '14/09/2025',
    status: 'FAILED',
  },
]

export function NewDocument() {
  return <h1>New Document</h1>
}
