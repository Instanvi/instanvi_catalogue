"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Product = {
  id: string;
  name: string;
  sku: string;
  basePrice: string;
  images: string[];
  isActive: boolean;
  updatedAt: string;
};

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "images",
    header: "Asset",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      return (
        <div className="h-12 w-12 bg-muted flex items-center justify-center border border-muted-foreground/10 overflow-hidden rounded-none">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt="Product"
              className="object-cover h-full w-full"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Detail",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const sku = row.original.sku;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground font-medium">
            {sku}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: "Base Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("basePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-semibold text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className="text-xs font-medium px-2 py-0"
        >
          {isActive ? "Available" : "Archived"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
              Repository Actions
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer">
              <ExternalLink className="mr-2 h-3 w-3" /> View Public
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-blue-600">
              <Edit className="mr-2 h-3 w-3" /> Update Specs
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-3 w-3" /> Force Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
