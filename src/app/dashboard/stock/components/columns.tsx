"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StockItem } from "@/services/stock.service";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, History, Settings2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const getColumns = (
  onUpdate: (item: StockItem) => void,
): ColumnDef<StockItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product.sku",
    header: "SKU",
    cell: ({ row }) => (
      <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm">
        {row.original.product.sku}
      </span>
    ),
  },
  {
    id: "product_name",
    accessorKey: "product.name",
    header: "Product Name",
    cell: ({ row }) => (
      <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate block max-w-[200px]">
        {row.original.product.name}
      </span>
    ),
  },
  {
    accessorKey: "product.category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-[9px] sm:text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm w-fit inline-block">
        {row.original.product.category || "—"}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Current Stock",
    cell: ({ row }) => {
      const quantity = parseFloat(row.original.quantity.toString());
      const threshold = parseFloat(row.original.lowStockThreshold.toString());
      const isLow = quantity <= threshold;

      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm sm:text-base font-bold",
              isLow ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-slate-100",
            )}
          >
            {quantity}
          </span>
          {isLow && (
            <span className="text-[8px] sm:text-[9px] font-bold uppercase text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
              Low
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Availability",
    cell: ({ row }) => {
      const quantity = parseFloat(row.original.quantity.toString());
      const isAvailable = quantity > 0;

      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full flex-shrink-0",
              isAvailable
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
            )}
          />
          <span
            className={cn(
              "text-[8px] sm:text-[9px] font-bold uppercase tracking-wider",
              isAvailable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {isAvailable ? "In" : "Out"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ row }) => (
      <span className="text-slate-600 dark:text-slate-400 text-[9px] sm:text-xs font-medium">
        {new Date(row.original.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-950"
          >
            <DropdownMenuLabel className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1.5">
              SKU: {item.product.sku}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-blue-50 dark:focus:bg-blue-900/20"
              onClick={() => onUpdate(item)}
            >
              <Settings2 className="mr-2 h-3.5 w-3.5" /> Update Stock
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800">
              <History className="mr-2 h-3.5 w-3.5" /> History
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
