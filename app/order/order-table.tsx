import * as React from "react";
import { OrderType } from "@/types/orderType";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderTableProps {
    orders: OrderType[];
    isLoading: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, isLoading }) => {
    const columns: ColumnDef<OrderType>[] = React.useMemo(
        () => [
            {
                accessorKey: "id",
                header: "Id",
                cell: ({ row }) => (
                    <TableCell>{row.original.id}</TableCell>
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "customerName",
                header: "Customer Name",
                cell: ({ row }) => (
                    <TableCell>{row.original.customerName}</TableCell>
                ),
            },
            {
                accessorKey: "productName",
                header: "Product Name",
                cell: ({ row }) => (
                    <TableCell>{row.original.productName}</TableCell>
                ),
            },
            {
                accessorKey: "quantity",
                header: "Quantity",
                cell: ({ row }) => (
                    <TableCell>{row.original.quantity}</TableCell>
                ),
            },
            {
                accessorKey: "totalPrice",
                header: "Total Price",
                cell: ({ row }) => (
                    <TableCell>{row.original.totalPrice}</TableCell>
                ),
            },
            {
                accessorKey: "orderDate",
                header: "Order Date",
                cell: ({ row }) => (
                    <TableCell>{row.original.orderDate}</TableCell>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                    <TableCell>{row.original.status}</TableCell>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: orders,
        columns,
        autoResetPageIndex: false,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                {isLoading ? (
                    <div className="flex items-center justify-center h-24">
                        <div className="spinner" />
                        {/* Replace the above line with your spinner/loading component */}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(header.id.charAt(0).toUpperCase() + header.id.slice(1), { column: header.column })}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.id, { row })}
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
                )}
            </div>
            <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-muted-foreground"></div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
