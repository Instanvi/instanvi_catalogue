import { Catalogue } from "@/services/catalogues.service";
import Image from "next/image";

interface CatalogueHeaderProps {
  catalogue: Catalogue | null | undefined;
}

export function CatalogueHeader({ catalogue }: CatalogueHeaderProps) {
  return (
    <div className="bg-white border-b border-muted/20">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-6 flex flex-row gap-2 sm:gap-4 md:gap-6 items-center text-left">
        {catalogue?.coverImage && (
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 flex-shrink-0 bg-muted overflow-hidden rounded-sm">
            <Image
              src={catalogue.coverImage}
              alt={catalogue.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-0.5 min-w-0 flex-1">
          <h1 className="text-sm sm:text-base md:text-xl font-black text-foreground tracking-tight uppercase truncate leading-tight">
            {catalogue?.name || "Catalogue"}
          </h1>
          {catalogue?.description && (
            <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground max-w-2xl font-medium leading-relaxed line-clamp-1 sm:line-clamp-2">
              {catalogue.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
