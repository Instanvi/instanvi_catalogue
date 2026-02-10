"use client";

import * as React from "react";
import {
  Users,
  Package,
  Calendar,
  Bell,
  Tag,
  BookOpen,
  Cube,
  ShoppingCart,
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
    icon: Cube,
  },
  {
    title: "Stock",
    url: "/dashboard/stock",
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
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
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
  const [user, setUser] = React.useState(data.user);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "",
          avatar: parsedUser.avatar || "/avatars/admin.jpg",
        });
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-[#F8FAFC] text-sidebar-foreground border-none"
      {...props}
    >
      <SidebarContent className="px-0 py-6 overflow-x-hidden">
        <SidebarMenu className="gap-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "h-[96px] w-full transition-all rounded-none px-0 flex justify-center items-center",
                    isActive
                      ? "bg-[#4B6BFB] text-white hover:bg-[#4B6BFB] hover:text-white"
                      : "text-black hover:bg-slate-100/50 hover:text-black",
                  )}
                >
                  <a
                    href={item.url}
                    className="flex flex-col items-center justify-center w-full h-full"
                  >
                    <item.icon size={26} weight="light" />
                    <span
                      className={cn(
                        "text-[9px] mt-2 hidden group-data-[state=expanded]:block uppercase tracking-[0.15em]",
                        isActive ? "font-black" : "font-semibold",
                      )}
                    >
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100 p-0 mb-4 bg-transparent">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
