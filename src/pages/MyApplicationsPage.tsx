import { useQuery } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { Link } from "react-router"
import { apiClient } from "../api/client"
import Table from "../components/Table"
import type { Application } from "../types"

const columnHelper = createColumnHelper<Application>()

const columns = [
  columnHelper.display({
    id: "index",
    header: "",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("applicationDate", {
    header: "Application Date",
    cell: (info) => info.getValue(),
  }),
]

export function MyApplicationsPage() {
  const getApplications = async (): Promise<Application[]> => {
    const res = await apiClient.get("/applications")
    return await res.data
  }

  // TanStack Query já dá referência estável
  // para a data da tabela
  const { data } = useQuery({
    queryKey: ["my-applications"],
    queryFn: getApplications,
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">My Applications Page</h1>
      <h2 className="font-semibold">All Applications</h2>
      {data && <Table columns={columns} data={data} />}
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
