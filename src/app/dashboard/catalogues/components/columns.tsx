"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Catalogue } from "@/services/catalogues.service";
import { format } from "date-fns";
import { MoreHorizontal, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

export const getColumns = (
  onAssignCategory: (catalogue: Catalogue) => void,
): ColumnDef<Catalogue>[] => [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const catalogue = row.original;
      return (
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {catalogue.coverImage && (
            <div className="relative h-10 sm:h-12 w-10 sm:w-12 flex-shrink-0 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              <Image
                src={catalogue.coverImage}
                alt={catalogue.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
              {catalogue.name}
            </span>
            {catalogue.description && (
              <span className="text-[8px] sm:text-xs text-slate-500 dark:text-slate-400 truncate line-clamp-1">
                {catalogue.description}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      // TODO: Fetch count from backend
      const count = row.original.products?.length || 0;
      return (
        <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
          <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-sm inline-block">
            {count} {count === 1 ? "item" : "items"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-tight text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm w-fit">
          {type}
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
          <div
            className={cn(
              "h-2 w-2 rounded-full flex-shrink-0",
              isActive
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                : "bg-slate-300 dark:bg-slate-500",
            )}
          />
          <span
            className={cn(
              "text-[8px] sm:text-[9px] font-bold uppercase tracking-wider",
              isActive ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500",
            )}
          >
            {isActive ? "LIVE" : "DRAFT"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      return (
        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
          {format(new Date(row.getValue("updatedAt")), "MMM d")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const catalogue = row.original;
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
              Ref: {catalogue.slug}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800"
              onClick={() =>
                window.open(`/${catalogue.slug}/catalogue`, "_blank")
              }
            >
              <ExternalLink className="mr-2 h-3.5 w-3.5" /> Preview Public
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800">
              <Edit className="mr-2 h-3.5 w-3.5" /> Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium cursor-pointer text-green-600 dark:text-green-400 focus:bg-green-50 dark:focus:bg-green-900/20"
              onClick={() => onAssignCategory(catalogue)}
            >
              <Users className="mr-2 h-3.5 w-3.5" /> Assign Category
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
