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
      <span className="font-mono text-[11px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5">
        {row.original.product.sku}
      </span>
    ),
  },
  {
    id: "product_name",
    accessorKey: "product.name",
    header: "Product Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.product.name}</span>
    ),
  },
  {
    accessorKey: "product.category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-[12px] text-muted-foreground uppercase font-semibold">
        {row.original.product.category || "Uncategorized"}
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
              "text-sm font-bold",
              isLow ? "text-red-600" : "text-foreground",
            )}
          >
            {quantity}
          </span>
          {isLow && (
            <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 px-1.5 whitespace-nowrap">
              Low Stock
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
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isAvailable
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
            )}
          />
          <span
            className={cn(
              "text-[10px] font-bold uppercase",
              isAvailable ? "text-green-600" : "text-red-600",
            )}
          >
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs font-medium">
        {new Date(row.original.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
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
              className="h-8 w-8 p-0 hover:bg-black hover:text-white rounded-none transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-none p-0 shadow-2xl"
          >
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-3 bg-[#F4F7FF]">
              SKU: {item.product.sku}
            </DropdownMenuLabel>
            <div className="p-1 bg-white">
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-slate-50"
                onClick={() => onUpdate(item)}
              >
                <Settings2 className="mr-2 h-3 w-3" /> Update Stock
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-slate-50">
                <History className="mr-2 h-3 w-3" /> Movement History
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-red-50 text-red-600">
                <Trash2 className="mr-2 h-3 w-3" /> Archive Record
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
