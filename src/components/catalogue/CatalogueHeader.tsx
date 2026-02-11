import { Catalogue } from "@/services/catalogues.service";
import Image from "next/image";

interface CatalogueHeaderProps {
  catalogue: Catalogue | null | undefined;
}

export function CatalogueHeader({ catalogue }: CatalogueHeaderProps) {
  return (
    <div className="bg-white border-b border-muted/20">
      <div className="max-w-5xl mx-auto px-4 py-3 md:py-6 flex flex-row gap-4 md:gap-6 items-center text-left">
        {catalogue?.coverImage && (
          <div className="relative h-12 w-12 md:h-16 md:w-16 flex-shrink-0 bg-muted overflow-hidden">
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
          <h1 className="text-base md:text-xl font-black text-foreground tracking-tight uppercase truncate">
            {catalogue?.name || "Catalogue"}
          </h1>
          {catalogue?.description && (
            <p className="text-[10px] md:text-sm text-muted-foreground max-w-2xl font-medium leading-relaxed truncate">
              {catalogue.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
