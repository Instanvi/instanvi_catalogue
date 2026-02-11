"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
  searchable?: boolean;
  addable?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  searchable = true,
  addable = true,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4 w-full">
      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-white border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="flex flex-1 gap-2 min-w-0 w-full sm:w-auto">
          {searchable && <Skeleton className="h-9 sm:h-10 w-full flex-1 rounded-lg" />}
        </div>
        {addable && <Skeleton className="h-9 sm:h-10 w-28 rounded-lg flex-shrink-0" />}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
        <Table className="border-0">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 border-b-2 border-slate-100 dark:border-slate-700">
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i} className="h-11 px-4 py-3">
                  <Skeleton className="h-3 w-20 rounded-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow
                key={i}
                className={cn(
                  "hover:bg-blue-50 dark:hover:bg-blue-900/20 border-b border-slate-100 dark:border-slate-700 transition-all duration-150",
                  i % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-900/5" : "bg-white dark:bg-slate-950"
                )}
              >
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j} className="h-12 sm:h-16 px-4 py-3">
                    <Skeleton className="h-3 w-full rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 bg-white border border-slate-200 dark:border-slate-700 rounded-lg">
        <Skeleton className="h-4 w-32 rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
