import { Search } from "lucide-react";

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="py-12 sm:py-20 text-center px-4">
      <div className="bg-muted w-14 h-14 sm:w-20 sm:h-20 rounded-none flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-tight">No products found</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
        Try adjusting your filters or search query.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="text-primary font-bold text-xs sm:text-sm hover:underline transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
