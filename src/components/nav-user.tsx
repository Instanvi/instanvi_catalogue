"use client";

import { Power } from "@phosphor-icons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <SidebarMenu className="px-0">
      <SidebarMenuItem>
        <div className="flex flex-col items-center gap-5 py-6">
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-[#4B6BFB] transition-colors p-2"
            title="Log out"
          >
            <Power size={24} weight="light" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none focus:ring-0">
                <Avatar className="h-10 w-10 border-2 border-slate-100 shadow-none hover:border-slate-200 transition-all rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-[#1c1c1c] text-white text-xs font-bold">
                    {user.name.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-none ml-2 border border-slate-200 shadow-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={20}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#1c1c1c] text-white">
                      {user.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 font-medium cursor-pointer"
              >
                <Power className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
