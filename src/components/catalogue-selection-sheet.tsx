"use client";

import { Button } from "@/components/ui/button";
import {
  useCatalogues,
  useBulkAddProductsToCatalogue,
} from "@/hooks/use-dashboard-catalogues";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Catalogue } from "@/services/catalogues.service";
import { Product } from "@/app/dashboard/products/components/columns";
import { FormSheet } from "./form-sheet";

interface CatalogueSelectionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: Product[];
}

export function CatalogueSelectionSheet({
  isOpen,
  onOpenChange,
  selectedProducts,
}: CatalogueSelectionSheetProps) {
  const { data: catalogues, isLoading: isLoadingCatalogues } = useCatalogues();
  const bulkAdd = useBulkAddProductsToCatalogue();
  const [selectedCatalogueId, setSelectedCatalogueId] = useState<string | null>(
    null,
  );

  const cataloguesList = (catalogues as Catalogue[]) || [];

  const handleConfirm = () => {
    if (!selectedCatalogueId) return;

    const payload = {
      products: selectedProducts.map((p) => ({
        productId: p.id,
        price: parseFloat(p.price) || 0,
        compareAtPrice: 0,
        displayOrder: 0,
      })),
    };

    bulkAdd.mutate(
      {
        catalogueId: selectedCatalogueId,
        payload,
      },
      {
        onSuccess: () => {
          toast.success(
            `${selectedProducts.length} products added to catalogue`,
          );
          onOpenChange(false);
          setSelectedCatalogueId(null);
        },
        onError: () => {
          toast.error("Failed to add products to catalogue");
        },
      },
    );
  };

  return (
    <FormSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Assign to Catalogue"
      description={`Select a catalogue to add ${selectedProducts.length} selected products.`}
      size="md"
    >
      <div className="space-y-2">
        {isLoadingCatalogues ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : cataloguesList.length > 0 ? (
          cataloguesList.map((cat: Catalogue) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatalogueId(cat.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 border transition-all text-left rounded-none",
                selectedCatalogueId === cat.id
                  ? "border-[#4B6BFB] bg-[#4B6BFB]/5"
                  : "border-muted-foreground/5 hover:border-[#4B6BFB]/30 hover:bg-slate-50 bg-white",
              )}
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">
                  {cat.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
                  {cat.type} • {cat.slug}
                </span>
              </div>
              {selectedCatalogueId === cat.id && (
                <Check className="h-4 w-4 text-[#4B6BFB]" />
              )}
            </button>
          ))
        ) : (
          <div className="text-center py-12 text-xs text-muted-foreground font-medium">
            No active catalogues found.
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1 h-12 font-bold text-[11px] uppercase tracking-wider rounded-none"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 h-12 font-bold text-[11px] uppercase tracking-wider rounded-none"
          disabled={!selectedCatalogueId || bulkAdd.isPending}
          onClick={handleConfirm}
        >
          {bulkAdd.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add to Catalogue"
          )}
        </Button>
      </div>
    </FormSheet>
  );
}
