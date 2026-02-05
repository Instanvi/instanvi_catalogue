"use client";

import { Bell } from "@phosphor-icons/react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-muted-foreground/10 p-8">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <Bell size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-medium text-foreground mb-2">
            No Notifications
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            You&apos;re all caught up! New notifications about your catalogues,
            customers, and orders will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
