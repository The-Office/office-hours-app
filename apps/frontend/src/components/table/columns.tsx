"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table-column-headers"

export type OFFICE_HOURS = {
  id: string
  course: string
  leader: string
  days: string
  start: string
  end: string
  location: string
}

export const columns: ColumnDef<OFFICE_HOURS>[] = [
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
    header: "Days",
  },
  {
    accessorKey: "start",
    header: "Start Time",
  },
  {
    accessorKey: "end",
    header: "End Time",
  },
  {
    accessorKey: "location",
    header: "Location",
  }
]
    