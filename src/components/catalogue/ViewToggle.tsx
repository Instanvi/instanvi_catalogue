"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1 bg-muted/50 p-0.5 sm:p-1 rounded-none">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("grid")}
        className={cn(
          "h-7 w-7 sm:h-8 sm:w-8 rounded-none transition-all",
          view === "grid" ? "bg-white text-primary" : "text-muted-foreground",
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("list")}
        className={cn(
          "h-7 w-7 sm:h-8 sm:w-8 rounded-none transition-all",
          view === "list" ? "bg-white text-primary" : "text-muted-foreground",
        )}
      >
        <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
}
