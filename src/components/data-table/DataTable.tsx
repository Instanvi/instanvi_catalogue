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
import { cn } from "@/lib/utils";

import { DataTableSkeleton } from "./DataTableSkeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  onAdd?: () => void;
  addLabel?: string;
  isLoading?: boolean;
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
  isLoading,
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

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        searchable={!!searchKey}
        addable={!!onAdd}
      />
    );
  }

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  return (
    <div className="space-y-4 w-full">
      {/* Toolbar Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="flex flex-1 items-center gap-2 min-w-0 w-full sm:w-auto">
          {hasSelection && bulkActions.length > 0 ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300 flex-wrap w-full">
              <span className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1.5 rounded-md whitespace-nowrap">
                {selectedRows.length} selected
              </span>
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={() =>
                    action.onClick(selectedRows.map((r) => r.original))
                  }
                  className="h-8 text-xs font-semibold uppercase tracking-tight rounded-md border-blue-200 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                >
                  {action.icon && <span className="mr-1.5">{action.icon}</span>}
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          ) : (
            searchKey && (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                  className="h-9 sm:h-10 pl-10 border-slate-200 dark:border-slate-700 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
                />
              </div>
            )
          )}
        </div>
        {!hasSelection && onAdd && (
          <Button
            onClick={onAdd}
            className="h-9 sm:h-10 px-4 sm:px-6 font-bold text-xs sm:text-sm uppercase tracking-wide bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">{addLabel}</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
        <Table className="border-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 border-b-2 border-slate-100 dark:border-slate-700"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm tracking-wider px-3 sm:px-4 py-3"
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
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-blue-50 dark:hover:bg-blue-900/20 border-b border-slate-100 dark:border-slate-700 transition-all duration-150",
                    idx % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-900/5" : "bg-white dark:bg-slate-950"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis"
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
                  className="h-24 sm:h-32 text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium"
                >
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          Showing{" "}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          records
        </p>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-md border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded-md whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-md border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 text-xs"
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
