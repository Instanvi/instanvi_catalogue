"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Edit, Trash2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type MemberCategory = {
  id: string;
  name: string;
  discountPercentage: string;
  markupPercentage: string;
  isDefault: boolean;
  memberCount: number;
};

export const columns: ColumnDef<MemberCategory>[] = [
  {
    accessorKey: "name",
    header: "Category Group",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">{row.getValue("name")}</span>
        {row.original.isDefault && (
          <span className="text-xs text-green-600 font-semibold">
            System Default
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "memberCount",
    header: "Customers",
    cell: ({ row }) => (
      <div className="font-medium text-sm">
        <span className="font-semibold">{row.getValue("memberCount")}</span>{" "}
        assigned
      </div>
    ),
  },
  {
    accessorKey: "discountPercentage",
    header: "Base Discount",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-green-600 text-green-700 font-medium text-xs"
      >
        -{row.getValue("discountPercentage")}%
      </Badge>
    ),
  },
  {
    accessorKey: "markupPercentage",
    header: "Base Markup",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-green-600 text-green-700 font-medium text-xs"
      >
        +{row.getValue("markupPercentage")}%
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
              Category Settings
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer">
              <Settings2 className="mr-2 h-3 w-3" /> Base Rules
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-green-600">
              <Edit className="mr-2 h-3 w-3" /> Edit Label
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-3 w-3" /> Dissolve Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
