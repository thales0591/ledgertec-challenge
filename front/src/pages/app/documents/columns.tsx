import { ColumnDef } from '@tanstack/react-table'

export type Payment = {
  id: string
  name: string
  preservationDate: string
  status: 'STARTED' | 'PRESERVED' | 'FAILED'
}

export const columns: ColumnDef<Payment, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'preservationDate',
    header: 'Preservation Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'download',
    header: 'Download',
    cell: () => {
      return (
        <div className="flex justify-center">
          <button>Download</button>
        </div>
      )
    },
  },
  {
    id: 'details',
    header: 'Open details',
    cell: () => {
      return (
        <div className="flex justify-center">
          <button>View</button>
        </div>
      )
    },
  },
]
