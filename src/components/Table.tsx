import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { Application } from "../types"

interface TableProps<TData> {
  data: TData[]
  columns: {
    [K in keyof Required<TData>]: ColumnDef<TData, TData[K]>
  }[keyof TData][]
}

export default function Table({ data, columns }: TableProps<Application>) {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
