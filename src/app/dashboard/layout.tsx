"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { title: "Catalogues", url: "/dashboard/catalogues" },
  { title: "Products", url: "/dashboard/products" },
  { title: "Stock", url: "/dashboard/stock" },
  { title: "Categories", url: "/dashboard/categories" },
  { title: "Customers", url: "/dashboard/customers" },
  { title: "Schedules", url: "/dashboard/schedules" },
  { title: "Notifications", url: "/dashboard/notifications" },
  { title: "Pricing", url: "/dashboard/pricing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const currentTitle =
    menuItems.find((item) => item.url === pathname)?.title || "Dashboard";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Only allow users with a businessId and admin/member role to access dashboard
        if (!user.businessId) {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-white">
        <header className="flex h-12 shrink-0 items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-sm font-semibold text-[#1c1c1c]">
              {currentTitle}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
