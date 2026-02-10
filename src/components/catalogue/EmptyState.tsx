import { Search } from "lucide-react";

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="py-20 text-center">
      <div className="bg-muted w-20 h-20 rounded-none flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-bold">No products found</h3>
      <p className="text-muted-foreground mb-6">
        Try adjusting your filters or search query.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="text-primary font-bold text-sm hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
