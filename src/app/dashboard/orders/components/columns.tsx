"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  type: "B2B" | "B2C";
  status: string;
  totalAmount: number;
  createdAt: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      return <span className="font-mono text-xs">{row.getValue("id")}</span>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant="outline" className="rounded-none">
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "XAF",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={cn(
            "rounded-none font-bold",
            status === "DELIVERED" && "bg-green-500 hover:bg-green-600",
            status === "PENDING" &&
              "bg-yellow-500 hover:bg-yellow-600 outline-none border-none text-white",
            status === "CANCELLED" && "bg-red-500 hover:bg-red-600",
            status === "SHIPPED" && "bg-blue-500 hover:bg-blue-600",
            status === "PAID" && "bg-indigo-500 hover:bg-indigo-600",
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
        </span>
      );
    },
  },
];

import { cn } from "@/lib/utils";
