"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Schedule = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  status: "upcoming" | "completed" | "cancelled";
};

export const columns: ColumnDef<Schedule>[] = [
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
    accessorKey: "title",
    header: "Event",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const status = row.original.status;
      return (
        <div className="flex flex-col">
          <span className="font-bold text-xs uppercase tracking-wider">
            {title}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase">
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-xs font-medium">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          {row.getValue("date")}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-xs font-medium">
          <Clock className="h-3 w-3 text-muted-foreground" />
          {row.getValue("time")}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location") as string;
      if (!location) return <span className="text-muted-foreground">-</span>;
      return (
        <div className="flex items-center gap-2 text-xs font-medium">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          {location}
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
          variant="outline"
          className={`rounded-none uppercase text-[10px] tracking-wider font-bold ${
            status === "completed"
              ? "bg-muted text-muted-foreground border-transparent"
              : status === "cancelled"
                ? "bg-red-50 text-red-600 border-red-100"
                : "bg-primary/5 text-primary border-primary/20"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const schedule = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-muted-foreground/20"
          >
            <DropdownMenuLabel className="uppercase text-[10px] tracking-widest text-muted-foreground">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(schedule.id)}
              className="rounded-none"
            >
              Copy Event ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-none">
              Edit Event
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 rounded-none">
              Cancel Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
