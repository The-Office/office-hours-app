"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table-column-headers"
import { OfficeHour } from "@/services/userService"


export const columns: ColumnDef<OfficeHour>[] = [
  {
    accessorKey: "course_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Code" />
    ),
  },
  {
    accessorKey: "host",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host" />
    ),
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
]
