"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../components/ui/table-column-headers"

export type Hours = {
  id: string
  course: string
  leader: string
  days: string
  start_time: string
  end_time: string
  location: string
}

export const columns: ColumnDef<Hours>[] = [
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
  },
  {
    accessorKey: "leader",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TA" />
    ),
  },
  {
    accessorKey: "days",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days" />
    ),
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  }
]
    