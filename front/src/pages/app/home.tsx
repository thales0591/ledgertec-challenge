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
import {
  DocStatus,
  Document,
  IngestStatus,
  TransferStatus,
} from '@/services/documents/interface'
import {
  downloadDocument,
  fetchAllDocuments,
  getIngestStatus,
  getTranferStatus,
  updateDocument,
} from '@/services/documents'
import { useMutation, useQuery } from '@tanstack/react-query'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { toastErrorStyle } from '@/lib/toast-error-style'
import toast from 'react-hot-toast'
import { Pagination } from '@/components/pagination'
import { z } from 'zod'
import { queryClient } from '@/lib/react-query'

type DocStatusProps = {
  status: DocStatus
}

export function Home() {
  const location = useLocation()
  const [documentId] = useState(location.state?.documentId)
  const [transferId, setTransferId] = useState(location.state?.trasnferId)
  const [ingestId, setIngestId] = useState('')
  const [documents, setDocuments] = useState<Document[]>()
  const [totalPages, setTotalPages] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const updateMutation = useMutation({
    mutationFn: updateDocument,
    onError: () => {
      toast.error(
        'Ocurred an error while updating your document :(',
        toastErrorStyle,
      )
    },
  })

  const checkStatus = useMutation({
    mutationFn: getTranferStatus,
    onSuccess: async (data: TransferStatus): Promise<void> => {
      if (data.status === 'COMPLETE') {
        setIngestId(data.sip_uuid)
        setTransferId('')
      }
      if (data.status !== 'COMPLETE' && data.status !== 'PROCESSING') {
        await updateMutation.mutateAsync({
          id: documentId,
          preservationStatus: 'FAILED',
        })
        setTransferId('')
      }
    },
  })

  const checkIngest = useMutation({
    mutationFn: getIngestStatus,
    onSuccess: async (data: IngestStatus) => {
      if (data.status === 'COMPLETE') {
        await updateMutation.mutateAsync({
          id: documentId,
          preservationStatus: 'PRESERVED',
          preservationDate: new Date(),
          ingestId: data.uuid,
        })
        setIngestId('')
        queryClient.invalidateQueries({
          queryKey: ['documents'],
        })
      }
      if (data.status !== 'COMPLETE' && data.status !== 'PROCESSING') {
        await updateMutation.mutateAsync({
          id: documentId,
          preservationStatus: 'FAILED',
        })
        setTransferId('')
      }
    },
  })

  const { data } = useQuery({
    queryKey: ['documents', pageIndex],
    queryFn: () => fetchAllDocuments(pageIndex),
  })

  useQuery({
    queryKey: ['transferId', transferId],
    queryFn: () => checkStatus.mutate(transferId),
    enabled: !!transferId,
    refetchInterval: transferId ? 2000 : false,
  })

  useQuery({
    queryKey: ['ingestId', ingestId],
    queryFn: () => checkIngest.mutateAsync(ingestId),
    enabled: !!ingestId,
    refetchInterval: ingestId ? 2000 : false,
  })

  function capitalizeStatus(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }

  function formatStatus({ status }: DocStatusProps) {
    return (
      <>
        {status === 'STARTED' && (
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
        )}
        {status === 'PRESERVED' && (
          <span className="h-2 w-2 rounded-full bg-green-500" />
        )}
        {status === 'FAILED' && (
          <span className="h-2 w-2 rounded-full bg-red-500" />
        )}
      </>
    )
  }

  function handlePageChange(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  const downloadMutation = useMutation({
    mutationFn: async ({
      name,
      ingestId,
    }: {
      name: string
      ingestId: string
    }) => {
      await downloadDocument(name, ingestId)
    },
  })

  function handleDownload(name: string, ingestId: string) {
    downloadMutation.mutate({ name, ingestId })
  }

  useEffect(() => {
    if (data) {
      setDocuments(data.data)
      setTotalPages(data.total)
    }
  }, [data])

  return (
    <div className="flex flex-1 w-full justify-center items-center">
      {documents && documents.length > 0 ? (
        <div className="flex flex-col gap-4">
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
                {documents.map((document: Document, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{document.id}</TableCell>
                      <TableCell>{document.name}</TableCell>
                      <TableCell>
                        {document.preservationDate
                          ? new Date(document.preservationDate).toLocaleString(
                              'pt-BR',
                            )
                          : 'Not preserved yet'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {formatStatus({
                            status: document.preservationStatus,
                          })}
                          <span>
                            {capitalizeStatus(document.preservationStatus)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="">
                        <Button className="bg-[#25C1D1] hover:bg-[#1C9FA5] h-8 w-12 ">
                          Open
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleDownload(document.name, document.ingestId)
                          }
                          className="bg-[#25C1D1] hover:bg-[#1C9FA5] h-8 w-18"
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination
            pageIndex={pageIndex}
            totalCount={totalPages}
            perPage={5}
            onPageChange={handlePageChange}
          />
          <div className="flex justify-end">
            <NavLink to={'/new-document'}>
              <Button className="bg-[#25C1D1] hover:bg-[#1C9FA5]">
                New document
              </Button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="text-[#25C1D1] font-bold text-xl flex flex-col gap-6">
          No documents found yet. Try uploading one to get started!
          <div className="flex justify-center">
            <NavLink to={'/new-document'}>
              <Button className="bg-[#25C1D1] hover:bg-[#1C9FA5]">
                Start preserving
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}
