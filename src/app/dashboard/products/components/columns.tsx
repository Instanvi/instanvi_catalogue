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

export type ProductUnit = {
  id: string;
  name: string;
  price: string;
  isDefault: boolean;
};

export type Product = {
  id: string;
  name: string;
  category?: string;
  sku: string;
  price: string;
  units?: ProductUnit[];
  images?: string[] | null;
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
        <div className="relative h-10 sm:h-12 w-10 sm:w-12 bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600 overflow-hidden rounded-md shadow-sm flex-shrink-0">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt="Product"
              fill
              className="object-cover h-full w-full"
            />
          ) : (
            <ImageIcon className="h-5 sm:h-6 w-5 sm:w-6 text-slate-300 dark:text-slate-500" />
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
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
            {name}
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight uppercase truncate">
            SKU: {sku}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <div className="text-[9px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 capitalize tracking-tight bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm w-fit">
          {category || "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "units",
    header: "Unit",
    cell: ({ row }) => {
      const units = row.original.units || [];
      const defaultUnit = units.find((u) => u.isDefault) || units[0];
      return (
        <div className="text-[9px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 italic capitalize truncate">
          {defaultUnit?.name || "piece"}
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
      return (
        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-sm w-fit">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Switch checked={isActive} onCheckedChange={() => {}} />
          <span
            className={cn(
              "text-[8px] sm:text-[9px] font-bold uppercase tracking-wider",
              isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500",
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
              Ref: {product.sku || product.id.slice(0, 8)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800">
              <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Public
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-blue-600 dark:text-blue-400 focus:bg-blue-50 dark:focus:bg-blue-900/20">
              <Edit className="mr-2 h-3.5 w-3.5" /> Update Specs
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Force Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { cn } from "@/lib/utils";
