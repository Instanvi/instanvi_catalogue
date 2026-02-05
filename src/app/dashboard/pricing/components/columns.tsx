"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex items-center gap-3">
        {row.original.targetType === "category" ? (
          <Layers className="h-4 w-4 text-muted-foreground" />
        ) : (
          <User className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="font-medium text-sm">
          {row.getValue("targetName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: "Exclusive Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Package className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm font-medium">
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
      }).format(price);
      return <div className="font-bold text-sm text-blue-700">{formatted}</div>;
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
      }).format(price);
      return (
        <div className="text-[10px] text-muted-foreground line-through font-bold">
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-black hover:text-white rounded-none"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-2 border-black"
          >
            <DropdownMenuLabel className="text-xs font-semibold">
              Pricing Control
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-3 w-3" /> Revoke Exclusive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
