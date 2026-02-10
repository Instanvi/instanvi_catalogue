"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  onAdd?: () => void;
  addLabel?: string;
  bulkActions?: {
    label: string;
    onClick: (rows: TData[]) => void;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "secondary" | "destructive";
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onAdd,
  addLabel = "Add New",
  bulkActions = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 h-12">
        <div className="flex flex-1 items-center gap-2 max-w-sm">
          {hasSelection && bulkActions.length > 0 ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-xs font-bold text-[#4B6BFB] mr-2 flex items-center gap-1 bg-[#4B6BFB]/5 px-2 py-1">
                {selectedRows.length} SELECTED
              </span>
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={() =>
                    action.onClick(selectedRows.map((r) => r.original))
                  }
                  className="h-8 text-[11px] font-bold uppercase tracking-tight rounded-none border-[#4B6BFB]/20 text-[#4B6BFB] hover:bg-[#4B6BFB] hover:text-white"
                >
                  {action.icon && <span className="mr-1.5">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          ) : (
            searchKey && (
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${searchKey}...`}
                  value={
                    (table.getColumn(searchKey)?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(searchKey)
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-10 pl-10 border-muted-foreground/20 rounded-none focus-visible:ring-black"
                />
              </div>
            )
          )}
        </div>
        {!hasSelection && onAdd && (
          <Button
            onClick={onAdd}
            className="h-10 px-6 font-bold text-[11px] uppercase tracking-wider"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </div>

      <div className="bg-white">
        <Table>
          <TableHeader className="bg-sidebar">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b-muted-foreground/5"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs font-medium h-12 text-black capitalize tracking-tight"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
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
                  className="hover:bg-muted/5 border-b-muted-foreground/5 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="h-16 py-0 font-medium tracking-tight"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground font-medium"
                >
                  No records matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <p className="text-xs text-muted-foreground font-medium">
          Showing {table.getFilteredRowModel().rows.length} records.
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-none border-muted-foreground/20"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-none border-muted-foreground/20"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
