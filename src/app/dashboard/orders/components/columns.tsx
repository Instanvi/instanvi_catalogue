"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  type: "B2B" | "B2C";
  status:
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "PAID";
  totalAmount: number;
  createdAt: string;
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Trash2,
  CheckCircle,
  Package,
  Truck,
  XCircle,
  CreditCard,
} from "lucide-react";

export const getColumns = (
  onUpdateStatus: (id: string, status: Order["status"]) => void,
  onDelete: (id: string) => void,
): ColumnDef<Order>[] => [
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
            "rounded-none font-bold text-[10px]",
            status === "DELIVERED" && "bg-green-500 hover:bg-green-600",
            status === "PENDING" &&
              "bg-yellow-500 hover:bg-yellow-600 outline-none border-none text-white",
            status === "CONFIRMED" && "bg-blue-400 hover:bg-blue-500",
            status === "CANCELLED" && "bg-red-500 hover:bg-red-600",
            status === "SHIPPED" && "bg-blue-600 hover:bg-blue-700",
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
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
            className="rounded-none border border-gray-100 p-0 shadow-xl bg-white"
          >
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-3 bg-gray-50 border-b border-gray-100">
              Order Operations
            </DropdownMenuLabel>
            <div className="p-0 bg-white">
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-gray-50 border-b border-gray-50"
                onClick={() => onUpdateStatus(order.id, "CONFIRMED")}
              >
                <CheckCircle className="mr-2 h-3.5 w-3.5 text-blue-500" />{" "}
                Confirm Order
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-gray-50 border-b border-gray-50"
                onClick={() => onUpdateStatus(order.id, "SHIPPED")}
              >
                <Truck className="mr-2 h-3.5 w-3.5 text-blue-600" /> Mark
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-gray-50 border-b border-gray-50"
                onClick={() => onUpdateStatus(order.id, "DELIVERED")}
              >
                <Package className="mr-2 h-3.5 w-3.5 text-green-500" /> Mark
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-gray-50 border-b border-gray-50"
                onClick={() => onUpdateStatus(order.id, "PAID")}
              >
                <CreditCard className="mr-2 h-3.5 w-3.5 text-indigo-500" /> Mark
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-gray-50 border-b border-gray-50"
                onClick={() => onUpdateStatus(order.id, "CANCELLED")}
              >
                <XCircle className="mr-2 h-3.5 w-3.5 text-red-400" /> Cancel
                Order
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-4 py-2.5 transition-colors hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-700"
                onClick={() => onDelete(order.id)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Order
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { cn } from "@/lib/utils";
