"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, User, Layers, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CustomPrice = {
  id: string;
  targetType: "member" | "category";
  targetName: string;
  productName: string;
  customPrice: string;
  basePrice: string;
};

export const columns: ColumnDef<CustomPrice>[] = [
  {
    accessorKey: "targetName",
    header: "Target Entity",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {row.original.targetType === "category" ? (
          <Layers className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        ) : (
          <User className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
            {row.getValue("targetName")}
          </span>
          <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-tight">
            {row.original.targetType}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: "Exclusive Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-0">
        <Package className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {row.getValue("productName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "customPrice",
    header: "Private Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("customPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price);
      return (
        <div className="font-bold text-xs sm:text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-sm w-fit">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: "MSRP Info",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("basePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price);
      return (
        <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 line-through font-medium">
          {formatted}
        </div>
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
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-950"
          >
            <DropdownMenuLabel className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1.5">
              Pricing Control
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Revoke Price
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
