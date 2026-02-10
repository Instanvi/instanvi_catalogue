"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Schedule } from "@/services/schedules.service";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MoreHorizontal, Mail, MessageSquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "title",
    header: "Campaign Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const Icon =
        type === "email" ? Mail : type === "sms" ? MessageSquare : Bell;
      return (
        <div className="flex items-center gap-2 capitalize">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "scheduledFor",
    header: "Scheduled / Sent Date",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {format(new Date(row.getValue("scheduledFor")), "MMM d, yyyy h:mm a")}
        </span>
      );
    },
  },
  {
    accessorKey: "recipientCount",
    header: "Recipients",
    cell: ({ row }) => <span>{row.getValue("recipientCount")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "sent"
          ? "default" // success/completed
          : status === "pending"
            ? "secondary" // waiting
            : status === "failed"
              ? "destructive"
              : "outline"; // cancelled

      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
