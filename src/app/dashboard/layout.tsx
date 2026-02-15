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
  { title: "Customers", url: "/dashboard/customers" },
  { title: "Products", url: "/dashboard/products" },
  { title: "Stock", url: "/dashboard/stock" },
  { title: "Product Units", url: "/dashboard/product-units" },
  { title: "Notifications", url: "/dashboard/notifications" },
  { title: "Orders", url: "/dashboard/orders" },
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
        <header className="flex h-10 sm:h-12 shrink-0 items-center justify-between px-2 sm:px-4 bg-white border-b border-muted/10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <SidebarTrigger className="-ml-1 h-8 sm:h-9 w-8 sm:w-9" />
            <Separator orientation="vertical" className="h-3 sm:h-4" />
            <h1 className="text-xs sm:text-sm font-semibold text-[#1c1c1c] truncate">
              {currentTitle}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-2 sm:p-3 md:p-4 gap-2 sm:gap-4 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
