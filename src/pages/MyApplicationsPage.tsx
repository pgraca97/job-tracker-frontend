import { useQuery } from "@tanstack/react-query"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Link } from "react-router"
import { apiClient } from "../api/client"
import type { Application } from "../types"

export function MyApplicationsPage() {
  const getApplications = async (): Promise<Application[]> => {
    const res = await apiClient.get("/applications")
    return await res.data
  }

  const { data, isPending } = useQuery({
    queryKey: ["my-applications"],
    queryFn: getApplications,
  })

  const columnHelper = createColumnHelper<Application>()

  const columns = [
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

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">My Applications Page</h1>
      <h2 className="font-semibold">All Applications</h2>

      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
