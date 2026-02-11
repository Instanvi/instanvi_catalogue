"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Customer = {
  id: string;
  providerBusinessId: string;
  customerBusinessId: string;
  categoryId: string;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
  customerBusiness: {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
  };
  category: {
    id: string;
    name: string;
    businessId: string;
  } | null;
};

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "customerBusiness.name",
    header: "Customer Name",
    cell: ({ row }) => {
      const name = row.original.customerBusiness?.name;
      return (
        <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate block max-w-[200px]">
          {name}
        </span>
      );
    },
  },
  {
    accessorKey: "customerBusiness.type",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-[9px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm w-fit inline-block">
        {row.original.customerBusiness?.type || "—"}
      </span>
    ),
  },
  {
    accessorKey: "customerBusiness.email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium truncate block max-w-[200px]">
        {row.original.customerBusiness?.email}
      </span>
    ),
  },
  {
    accessorKey: "customerBusiness.phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium font-mono">
        {row.original.customerBusiness?.phone}
      </span>
    ),
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return category ? (
        <Badge
          variant="outline"
          className="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold text-[9px] sm:text-xs"
        >
          {category.name}
        </Badge>
      ) : (
        <span className="text-[9px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
          Standard
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

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
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800"
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-blue-600 dark:text-blue-400 focus:bg-blue-50 dark:focus:bg-blue-900/20">
              <Edit className="mr-2 h-3.5 w-3.5" /> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Remove Access
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
