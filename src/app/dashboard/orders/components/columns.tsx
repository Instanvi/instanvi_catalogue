"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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

export const getColumns = (
  onUpdateStatus: (id: string, status: Order["status"]) => void,
  onDelete: (id: string) => void,
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      return (
        <span className="font-mono text-[8px] sm:text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm">
          {row.getValue("id").toString().slice(0, 12)}...
        </span>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate block max-w-[150px]">
        {row.getValue("customerName")}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge
          variant="outline"
          className="border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold text-[9px] sm:text-xs rounded-md"
        >
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
        minimumFractionDigits: 0,
      }).format(amount);
      return (
        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-sm w-fit">
          {formatted}
        </div>
      );
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
            "font-bold text-[9px] sm:text-xs rounded-md",
            status === "DELIVERED" && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
            status === "PENDING" && "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
            status === "CONFIRMED" && "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
            status === "CANCELLED" && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
            status === "SHIPPED" && "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
            status === "PAID" && "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
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
        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
          {format(new Date(row.getValue("createdAt")), "MMM dd")}
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
              Order Operations
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-blue-50 dark:focus:bg-blue-900/20"
              onClick={() => onUpdateStatus(order.id, "CONFIRMED")}
            >
              <CheckCircle className="mr-2 h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Confirm
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-purple-50 dark:focus:bg-purple-900/20"
              onClick={() => onUpdateStatus(order.id, "SHIPPED")}
            >
              <Truck className="mr-2 h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> Ship
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-green-50 dark:focus:bg-green-900/20"
              onClick={() => onUpdateStatus(order.id, "DELIVERED")}
            >
              <Package className="mr-2 h-3.5 w-3.5 text-green-500 dark:text-green-400" /> Deliver
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-indigo-50 dark:focus:bg-indigo-900/20"
              onClick={() => onUpdateStatus(order.id, "PAID")}
            >
              <CreditCard className="mr-2 h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" /> Mark Paid
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-yellow-50 dark:focus:bg-yellow-900/20"
              onClick={() => onUpdateStatus(order.id, "CANCELLED")}
            >
              <XCircle className="mr-2 h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400" /> Cancel
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
              onClick={() => onDelete(order.id)}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
