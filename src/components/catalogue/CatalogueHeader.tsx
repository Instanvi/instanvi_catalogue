import { Catalogue } from "@/services/catalogues.service";
import Image from "next/image";

interface CatalogueHeaderProps {
  catalogue: Catalogue | null | undefined;
}

export function CatalogueHeader({ catalogue }: CatalogueHeaderProps) {
  return (
    <div className="bg-white border-b border-muted/20">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        {catalogue?.coverImage && (
          <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 bg-muted overflow-hidden">
            <Image
              src={catalogue.coverImage}
              alt={catalogue.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
            {catalogue?.name || "Catalogue"}
          </h1>
          {catalogue?.description && (
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl font-medium leading-relaxed">
              {catalogue.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
