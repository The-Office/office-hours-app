"use client"

import * as React from "react"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Button } from "@/components/ui/button"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { InsertOfficeHoursForm } from "./insert-office-hours"
import { deleteOfficeHours, fetchOfficeHours, getIcalFile, OfficeHour } from "@/services/userService"
// import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    admin: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    admin,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    // const { toast } = useToast()
    
    const { refetch } = useQuery({
        queryKey: ['officeHours'],
        queryFn: fetchOfficeHours,
      });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleDownloadClick = async () => {
        try {
            const payload = await getIcalFile();    
            if (payload && payload.statusCode === 200) {
                const dataUrl = payload.data;
            
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "office_hours.ics";
                
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                throw new Error("Failed to get iCal file");
            }
        } catch(error) {
            console.error("iCal download error:", error);
        }
    }
      
    const handleDeleteClick = async () => {
        const indices = Object.keys(rowSelection) // "['0', '1', '2']"
        const rows = data.filter((_, index) => indices.includes(index.toString())) as OfficeHour[]
        const ids = rows.map((row) => row.id)
        console.log(ids)
        await deleteOfficeHours(ids)
        await refetch()
        setRowSelection({})
    };
      
    const DeleteButton = () => {
        const numSelected = Object.keys(rowSelection).length;
    
        return (
        <Button variant="outline" size="sm" onClick={handleDeleteClick}>
            Delete {numSelected} Selected
        </Button>
        );
    };

    return (
        <>
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder="Search course..."
                    value={(table.getColumn("course_code")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("course_code")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Search host..."
                    value={(table.getColumn("host")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("host")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
                {admin && <InsertOfficeHoursForm />}
                {admin && Object.keys(rowSelection).length > 0 && (<DeleteButton />)}
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow 
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="my-3 flex justify-between">
                <DataTablePagination table={table} />
                <Button variant="outline" onClick={handleDownloadClick}>Download iCal</Button>
            </div>
        </>
    )
}