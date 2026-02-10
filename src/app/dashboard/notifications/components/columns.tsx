"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NotificationHistory } from "@/types/api";
import { format } from "date-fns";
import {
  EnvelopeSimple,
  DeviceMobile,
  WhatsappLogo,
} from "@phosphor-icons/react";

export const columns: ColumnDef<NotificationHistory>[] = [
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => {
      const channel = row.getValue("channel") as string;
      return (
        <div className="flex items-center gap-2">
          {channel === "email" && <EnvelopeSimple size={16} />}
          {channel === "sms" && <DeviceMobile size={16} />}
          {channel === "whatsapp" && <WhatsappLogo size={16} />}
          <span className="capitalize">{channel}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Subject",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Target",
    cell: ({ row }) => {
      const category = row.original.category;
      return category?.name || "All Customers";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Sent At",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy HH:mm")}
      </div>
    ),
  },
];
