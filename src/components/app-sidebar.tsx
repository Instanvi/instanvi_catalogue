"use client";

import * as React from "react";
import {
  Users,
  Package,
  Calendar,
  Bell,
  Tag,
  BookOpen,
} from "@phosphor-icons/react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Catalogues",
    url: "/dashboard/catalogues",
    icon: BookOpen,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Schedules",
    url: "/dashboard/schedules",
    icon: Calendar,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
];

const data = {
  user: {
    name: "Admin User",
    email: "admin@instanvi.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-primary text-primary-foreground"
      {...props}
    >
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "h-9 transition-all rounded-sm font-medium text-[13px] px-3",
                    isActive
                      ? "bg-white text-primary hover:bg-white/90 hover:text-primary"
                      : "text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                  )}
                >
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon size={18} weight="bold" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-muted-foreground/10 p-4 bg-muted/5">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
