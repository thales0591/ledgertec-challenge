import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Document } from '@/services/documents/interface'
import { fetchAllDocuments } from '@/services/documents'

export function Home() {
  const [documents, setDocuments] = useState<Document[]>()

  const capitalizedStatus = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

  useEffect(() => {
    async function fetchData() {
      const res = await fetchAllDocuments()
      setDocuments(res)
      console.log(res)
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-1 w-full justify-center items-center">
      {documents ? (
        <div className="rounded-md border w-6xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[180px]">Preservation Date</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[132px]">Details</TableHead>
                <TableHead className="w-[132px]">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{document.id}</TableCell>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>
                      {document.preservationDate
                        ? document.preservationDate.toString()
                        : 'Not preserved yet'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        <span>
                          {capitalizedStatus(document.preservationStatus)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="">
                      <Button className="bg-[#25C1D1] hover:bg-[#1C9FA5] h-8 w-12 ">
                        Open
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className="bg-[#25C1D1] hover:bg-[#1C9FA5] h-8 w-18">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-[#25C1D1] font-bold text-xl">
          No documents found yet. Try uploading one to get started!
        </div>
      )}
    </div>
  )
}
