import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ViewToggle } from "./ViewToggle";

interface CatalogueSearchProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function CatalogueSearch({
  value,
  onChange,
  categories,
  selectedCategory,
  onCategoryChange,
  view,
  onViewChange,
}: CatalogueSearchProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 h-8 sm:h-9 bg-muted/30 border-none shadow-none focus-visible:ring-primary focus-visible:border-primary transition-all rounded-none text-xs sm:text-sm"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-none transition-colors"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 -mx-1 px-1">
          <CategoryButton
            label="All"
            active={selectedCategory === "all"}
            onClick={() => onCategoryChange("all")}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              active={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            />
          ))}
        </div>

        <div className="flex-shrink-0">
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 sm:px-3 py-0.5 sm:py-1 rounded-none text-[9px] sm:text-xs font-bold transition-all whitespace-nowrap border-[1.5px]",
        active
          ? "bg-primary text-white border-primary"
          : "bg-transparent text-muted-foreground hover:bg-muted border-muted/20",
      )}
    >
      {label}
    </button>
  );
}
