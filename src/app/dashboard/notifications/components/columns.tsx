"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NotificationHistory } from "@/types/api";
import { cn } from "@/lib/utils";
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
      const channelColors = {
        email: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        sms: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
        whatsapp: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
      };
      
      return (
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-md",
            channelColors[channel as keyof typeof channelColors]
          )}>
            {channel === "email" && <EnvelopeSimple size={16} weight="bold" />}
            {channel === "sms" && <DeviceMobile size={16} weight="bold" />}
            {channel === "whatsapp" && <WhatsappLogo size={16} weight="bold" />}
          </div>
          <span className="text-xs sm:text-sm font-semibold capitalize text-slate-900 dark:text-slate-100">
            {channel}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Subject",
    cell: ({ row }) => (
      <div className="max-w-xs truncate font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Target",
    cell: ({ row }) => {
      const category = row.original.category;
      const targetName = category?.name || "All Customers";
      return (
        <div className="text-[9px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-sm w-fit inline-block">
          {targetName}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Sent At",
    cell: ({ row }) => (
      <div className="text-[9px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
        {format(new Date(row.getValue("createdAt")), "MMM dd HH:mm")}
      </div>
    ),
  },
];
