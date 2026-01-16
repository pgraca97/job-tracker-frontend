import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useDeleteApplication } from "../hooks/useDelApplication"
import type { Application } from "../types"

interface TableProps<TData> {
  data: TData[]
  columns: {
    [K in keyof Required<TData>]: ColumnDef<TData, TData[K]>
  }[keyof TData][]
}

export default function Table({ data, columns }: TableProps<Application>) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  const navigate = useNavigate()
  const { deleteWithConfirmation } = useDeleteApplication();

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const _handleMouseEnter = (row: any) => {
    console.log("Hovered cell:", row.index)
    console.log(`Mouse entered cell with id: ${row.id}`)
    if (row.id.includes("company")) {
      console.log("You hovered over a Company cell!")
    }
  }

  const _handleCompanyClick = (application: Application) => {
    console.log("Company cell clicked:", application.id)
    navigate(`/application/${application.id}`)
  }

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
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
                <td
                  key={cell.id}
                  className={
                    cell.column.id === "company"
                      ? "hover:bg-blue-50 relative"
                      : cell.column.id === "index"
                        ? "relative"
                        : ""
                  }
                  onMouseEnter={() => { setHoveredCell(cell.id); _handleMouseEnter(row); }}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {cell.column.id === "company" && hoveredCell === cell.id && (
                    <button
                      onClick={() => _handleCompanyClick(row.original)}
                      type="button"
                      className="absolute right-0 cursor-pointer"
                    >
                      Open
                    </button>
                  )}
                  {cell.column.id === "index" && hoveredCell === cell.id && (
                    <button
                      onClick={() => deleteWithConfirmation(row.original.id)}
                      type="button"
                      className="absolute right-0"
                    >
                      Delete
                    </button>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
