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
        <div className="flex items-center gap-4">
          {catalogue.coverImage && (
            <div className="relative h-10 w-10">
              <Image
                src={catalogue.coverImage}
                alt={catalogue.name}
                fill
                unoptimized
                className="object-cover rounded-none border"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {catalogue.name}
            </span>
            {catalogue.description && (
              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
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
      return <span>{row.original.products?.length || 0} items</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="text-[10px] font-bold uppercase tracking-tight text-slate-500 bg-slate-100 px-2 py-0.5 inline-block">
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
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isActive
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                : "bg-slate-300",
            )}
          />
          <span
            className={cn(
              "text-[10px] font-bold uppercase",
              isActive ? "text-green-600" : "text-slate-400",
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
        <span className="text-muted-foreground">
          {format(new Date(row.getValue("updatedAt")), "MMM d, yyyy")}
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
              className="h-8 w-8 p-0 hover:bg-black hover:text-white rounded-none"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-none p-0"
          >
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-3 bg-[#F4F7FF]">
              Ref: {catalogue.slug}
            </DropdownMenuLabel>
            <div className="p-1 bg-white">
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-slate-50"
                onClick={() =>
                  window.open(`/${catalogue.slug}/catalogue`, "_blank")
                }
              >
                <ExternalLink className="mr-2 h-3 w-3" /> Preview Public
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-slate-50">
                <Edit className="mr-2 h-3 w-3" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-slate-50 text-blue-600"
                onClick={() => onAssignCategory(catalogue)}
              >
                <Users className="mr-2 h-3 w-3" /> Assign Category
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem className="text-xs font-medium cursor-pointer px-3 transition-colors hover:bg-red-50 text-red-600">
                <Trash2 className="mr-2 h-3 w-3" /> Delete
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
