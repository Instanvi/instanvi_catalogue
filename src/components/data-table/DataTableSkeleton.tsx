"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 h-12">
        <div className="flex flex-1 items-center gap-2 max-w-sm">
          {searchable && <Skeleton className="h-10 w-full" />}
        </div>
        {addable && <Skeleton className="h-10 w-32" />}
      </div>

      <div className="bg-white border-0 shadow-none">
        <Table className="border-0">
          <TableHeader className="bg-white">
            <TableRow className="hover:bg-transparent border-none">
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i} className="h-12">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow
                key={i}
                className="hover:bg-muted/5 border-none transition-colors"
              >
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j} className="h-16 py-0">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
