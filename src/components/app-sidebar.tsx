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
  Power,
  Info,
} from "@phosphor-icons/react";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  {
    title: "Catalogues",
    url: "/dashboard/catalogues",
    icon: BookOpen,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="bg-white border-r border-gray-100"
        {...props}
      >
        {/* <SidebarHeader className="flex items-center justify-start px-4 py-6 group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-none bg-primary text-white shrink-0">
              <BookOpen className="size-6" weight="fill" />
            </div>
            <span className="font-black text-xl tracking-tighter text-black group-data-[collapsible=icon]:hidden">
              INSTANVI
            </span>
          </div>
        </SidebarHeader> */}
        <SidebarContent className="px-0 py-2 overflow-x-hidden">
          <SidebarMenu className="gap-0">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title} className="list-none">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "w-full h-16 transition-all rounded-none px-4 justify-start relative gap-4",
                          "hover:bg-gray-50",
                          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                          isActive && "bg-primary hover:bg-primary/90",
                        )}
                      >
                        <a
                          href={item.url}
                          className="flex items-center gap-4 w-full h-full"
                        >
                          <item.icon
                            size={24}
                            weight={isActive ? "fill" : "regular"}
                            className={cn(
                              "transition-colors shrink-0",
                              isActive
                                ? "text-white"
                                : "text-black hover:text-gray-700",
                            )}
                          />
                          <span
                            className={cn(
                              "font-normal text-sm transition-colors truncate group-data-[collapsible=icon]:hidden",
                              isActive ? "text-white" : "text-black",
                            )}
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="font-semibold text-sm group-data-[collapsible=icon]:block hidden"
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-100 p-4 bg-white mt-auto group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:border-none">
          <div className="flex flex-col gap-4 group-data-[collapsible=icon]:items-center">
            <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0">
              <Avatar className="size-10 cursor-pointer rounded-full border-2 border-gray-100 shrink-0 overflow-hidden">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-black rounded-full">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-normal text-black truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full transition-all duration-300",
                "px-4 py-3 rounded-none bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm",
                "group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-red-400 group-data-[collapsible=icon]:hover:text-red-600 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center",
              )}
            >
              <Power size={20} weight="bold" />
              <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">
                Logout Account
              </span>
            </button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
