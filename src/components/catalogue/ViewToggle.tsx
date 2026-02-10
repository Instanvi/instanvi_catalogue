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
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-none">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("grid")}
        className={cn(
          "h-8 w-8 rounded-none transition-all",
          view === "grid" ? "bg-white text-primary" : "text-muted-foreground",
        )}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("list")}
        className={cn(
          "h-8 w-8 rounded-none transition-all",
          view === "list" ? "bg-white text-primary" : "text-muted-foreground",
        )}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
