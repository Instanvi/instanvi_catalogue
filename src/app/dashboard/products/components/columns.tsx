"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Switch } from "@/components/ui/switch";

export type Product = {
  id: string;
  name: string;
  category?: string;
  sku: string;
  price: string;
  unit: string;
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
        <div className="relative h-12 w-12 bg-muted flex items-center justify-center border border-muted-foreground/10 overflow-hidden rounded-none">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt="Product"
              fill
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
          <span className="font-semibold text-sm">{name}</span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-tight">
            {sku}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="text-xs font-medium text-slate-500 capitalize tracking-tight">
          {row.getValue("category")}
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      return (
        <div className="text-xs font-medium text-slate-500 italic">
          per {row.getValue("unit")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "XAF",
        minimumFractionDigits: 0,
      }).format(price);
      return <div className="font-bold text-sm text-black">{formatted}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="flex items-center gap-2">
          <Switch checked={isActive} onCheckedChange={() => {}} />
          <span
            className={cn(
              "text-[10px] font-bold uppercase",
              isActive ? "text-[#4B6BFB]" : "text-slate-400",
            )}
          >
            {isActive ? "ON" : "OFF"}
          </span>
        </div>
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
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
              Ref: {product.sku || product.id.slice(0, 8)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/5" />
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

import { cn } from "@/lib/utils";
