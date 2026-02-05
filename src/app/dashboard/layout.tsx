"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const pageTitles: Record<string, string> = {
  "/dashboard/catalogues": "Catalogues",
  "/dashboard/products": "Products",
  "/dashboard/categories": "Customer Categories",
  "/dashboard/members": "Customers",
  "/dashboard/schedules": "Schedules",
  "/dashboard/notifications": "Notifications",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-white">
        <header className="flex h-12 shrink-0 items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-base font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
