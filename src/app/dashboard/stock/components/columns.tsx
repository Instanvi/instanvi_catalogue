"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StockItem } from "@/services/stock.service";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Minus } from "lucide-react";

export const columns: ColumnDef<StockItem>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "currentStock",
    header: "Quantity",
    cell: ({ row }) => {
      const stock = row.getValue("currentStock") as number;
      const threshold = row.original.lowStockThreshold;
      return (
        <div className={stock <= threshold ? "text-destructive font-bold" : ""}>
          {stock}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "in_stock"
          ? "default"
          : status === "low_stock"
            ? "warning" // warning variant might not exist, default to secondary or destructive
            : "destructive";

      return (
        <Badge
          variant={variant === "warning" ? "secondary" : variant}
          className="capitalize"
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {new Date(row.getValue("lastUpdated")).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
            <DropdownMenuItem>View History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
