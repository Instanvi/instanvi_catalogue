"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductUnit } from "@/services/product-units.service";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ProductUnit>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-sm text-[#1c1c1c]">
            {row.getValue("name")}
          </span>
          {row.original.description && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {row.original.description}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <div className="font-bold text-xs uppercase tracking-tight bg-gray-100 px-2 py-1 rounded-none w-fit border border-gray-200">
        {row.getValue("symbol")}
      </div>
    ),
  },
  {
    accessorKey: "factor",
    header: "Factor",
    cell: ({ row }) => (
      <div className="font-medium text-sm text-[#1c1c1c]">
        {row.original.factor || "-"}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              isActive ? "bg-green-500" : "bg-gray-300",
            )}
          />
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              isActive ? "text-green-600" : "text-gray-400",
            )}
          >
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-medium text-muted-foreground">
          {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-950"
          >
            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
              <Edit className="mr-2 h-3.5 w-3.5" /> Edit Unit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-bold cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Unit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
