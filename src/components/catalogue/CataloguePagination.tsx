"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CataloguePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CataloguePagination({
  currentPage,
  totalPages,
  onPageChange,
}: CataloguePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-muted/10 bg-white px-2">
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0 rounded-none border-muted-foreground/20 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0 rounded-none border-muted-foreground/20 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
