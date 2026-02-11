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
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4 h-9 sm:h-12 flex-wrap">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {hasSelection && bulkActions.length > 0 ? (
            <div className="flex items-center gap-1 sm:gap-2 animate-in fade-in slide-in-from-left-2 duration-300 flex-wrap">
              <span className="text-[9px] sm:text-xs font-bold text-[#4B6BFB] bg-[#4B6BFB]/5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                {selectedRows.length} SEL
              </span>
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={() =>
                    action.onClick(selectedRows.map((r) => r.original))
                  }
                  className="h-7 sm:h-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-tight rounded-none border-[#4B6BFB]/20 text-[#4B6BFB] hover:bg-[#4B6BFB] hover:text-white px-2 sm:px-3"
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          ) : (
            searchKey && (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search...`}
                  value={
                    (table.getColumn(searchKey)?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(searchKey)
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 sm:h-10 pl-9 border-muted-foreground/20 rounded-none focus-visible:ring-black text-xs sm:text-sm"
                />
              </div>
            )
          )}
        </div>
        {!hasSelection && onAdd && (
          <Button
            onClick={onAdd}
            className="h-8 sm:h-10 px-3 sm:px-6 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider flex-shrink-0"
          >
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{addLabel}</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      <div className="bg-white border border-muted/20 rounded-sm shadow-sm overflow-x-auto">
        <Table className="border-0">
          <TableHeader className="bg-muted/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[10px] sm:text-xs font-bold h-10 sm:h-12 text-black capitalize tracking-tight px-2 sm:px-4 whitespace-nowrap"
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
                  className="hover:bg-muted/5 border-b border-muted/10 transition-colors last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="h-12 sm:h-16 py-2 sm:py-0 font-medium tracking-tight text-xs sm:text-sm px-2 sm:px-4"
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
                  className="h-20 sm:h-32 text-center text-muted-foreground font-medium text-xs sm:text-sm"
                >
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm gap-2 flex-wrap">
        <p className="text-xs text-muted-foreground font-medium">
          {table.getFilteredRowModel().rows.length} records
        </p>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            className="h-7 sm:h-8 w-7 sm:w-8 p-0 rounded-none border-muted-foreground/20 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="text-xs font-medium whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}/{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            className="h-7 sm:h-8 w-7 sm:w-8 p-0 rounded-none border-muted-foreground/20 text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
