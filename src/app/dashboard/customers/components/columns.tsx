"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
      return <span className="font-medium text-sm">{name}</span>;
    },
  },
  {
    accessorKey: "customerBusiness.type",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-medium text-xs">
        {row.original.customerBusiness?.type || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "customerBusiness.email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.customerBusiness?.email}</span>
    ),
  },
  {
    accessorKey: "customerBusiness.phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.customerBusiness?.phone}</span>
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
          className="border-primary text-primary font-medium text-xs"
        >
          {category.name}
        </Badge>
      ) : (
        <span className="text-muted-foreground text-sm">Standard</span>
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
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
              className="text-xs font-medium cursor-pointer"
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-blue-600">
              <Edit className="mr-2 h-3 w-3" /> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-3 w-3" /> Remove Access
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
