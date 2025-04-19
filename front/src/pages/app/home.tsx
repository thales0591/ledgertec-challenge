import { columns } from './documents/columns'
import { DataTable } from './documents/data-table'
import { payments } from './documents/NewDocument'

export function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}
