import { Skeleton } from "@/components/ui/skeleton";

export function CatalogueLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-white min-h-screen">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full max-w-2xl rounded-none" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-none" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="aspect-square rounded-none" />
        ))}
      </div>
    </div>
  );
}
