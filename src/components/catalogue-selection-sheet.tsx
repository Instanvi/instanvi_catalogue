"use client";

import { Button } from "@/components/ui/button";
import {
  useCatalogues,
  useBulkAddProductsToCatalogue,
} from "@/hooks/use-dashboard-catalogues";
import { useState, useEffect } from "react";
import { Check, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Catalogue } from "@/services/catalogues.service";
import { Product } from "@/app/dashboard/products/components/columns";
import { FormSheet } from "./form-sheet";
import { Input } from "@/components/ui/input";
import NextImage from "next/image";

interface CatalogueSelectionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: Product[];
}

interface ProductOverride {
  price: string;
  units: Record<string, string>;
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

  // Local state for product overrides (price and unit prices)
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>(
    {},
  );

  // Initialize overrides when sheet opens
  useEffect(() => {
    if (isOpen && selectedProducts.length > 0) {
      const initialOverrides: Record<string, ProductOverride> = {};
      selectedProducts.forEach((p) => {
        initialOverrides[p.id] = {
          price: p.price,
          units: (p.units || []).reduce(
            (acc, unit) => ({
              ...acc,
              [unit.id]: unit.price,
            }),
            {} as Record<string, string>,
          ),
        };
      });

      // Update state in next tick to avoid synchronous cascading render warning
      const timeoutId = setTimeout(() => {
        setOverrides(initialOverrides);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    if (!isOpen && Object.keys(overrides).length > 0) {
      const timeoutId = setTimeout(() => {
        setOverrides({});
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, selectedProducts, overrides]);

  const cataloguesList = (catalogues as Catalogue[]) || [];

  const handlePriceChange = (productId: string, value: string) => {
    setOverrides((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || { price: "0", units: {} }),
        price: value,
      },
    }));
  };

  const handleUnitPriceChange = (
    productId: string,
    unitId: string,
    value: string,
  ) => {
    setOverrides((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || { price: "0", units: {} }),
        units: {
          ...prev[productId]?.units,
          [unitId]: value,
        },
      },
    }));
  };

  const handleConfirm = () => {
    if (!selectedCatalogueId) return;

    const payload = {
      products: selectedProducts.map((p) => {
        const productOverride = overrides[p.id] || {
          price: p.price,
          units: {},
        };
        return {
          productId: p.id,
          price: parseFloat(productOverride.price) || 0,
          compareAtPrice: 0,
          displayOrder: 0,
          unitPrices: (p.units || []).map((unit) => ({
            productUnitId: unit.id,
            price: parseFloat(productOverride.units[unit.id]) || 0,
            compareAtPrice: 0,
          })),
        };
      }),
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
      description={`Refine pricing and select a destination catalogue.`}
      size="full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-h-[70vh] overflow-hidden">
        {/* Left: Product List & Price Editing */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-4 border-r border-muted-foreground/10">
          <div className="flex items-center justify-between sticky top-0 bg-white py-2 z-10 border-b border-muted-foreground/5 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4B6BFB]">
              Refine Products ({selectedProducts.length})
            </span>
          </div>

          <div className="space-y-6 pb-6">
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className="group border border-muted-foreground/10 p-4 bg-[#fafafa]"
              >
                <div className="flex gap-4 items-start">
                  <div className="relative h-16 w-16 bg-muted shrink-0 border border-muted-foreground/10">
                    {p.images && p.images[0] ? (
                      <NextImage
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 absolute inset-0 m-auto text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-black truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                      REF: {p.sku}
                    </p>

                    <div className="mt-4 space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                          Base Price (XAF)
                        </label>
                        <Input
                          type="number"
                          value={overrides[p.id]?.price || "0"}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handlePriceChange(p.id, e.target.value)
                          }
                          className="h-10 text-sm font-bold bg-white rounded-none border-muted-foreground/20 focus-visible:ring-primary shadow-none"
                        />
                      </div>

                      {p.units && p.units.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-muted-foreground/5">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                            Unit Overrides
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {p.units.map((unit) => (
                              <div key={unit.id} className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-500 uppercase truncate block">
                                  {unit.name}
                                </label>
                                <Input
                                  type="number"
                                  value={overrides[p.id]?.units[unit.id] || "0"}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) =>
                                    handleUnitPriceChange(
                                      p.id,
                                      unit.id,
                                      e.target.value,
                                    )
                                  }
                                  className="h-9 px-2 text-xs font-bold bg-white rounded-none border-muted-foreground/20 focus-visible:ring-primary shadow-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Catalogue Selection */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-white py-2 z-10 border-b border-muted-foreground/5 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4B6BFB]">
              Target Catalogue
            </span>
          </div>

          <div className="space-y-2">
            {isLoadingCatalogues ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : cataloguesList.length > 0 ? (
              <div className="flex flex-col gap-2">
                {cataloguesList.map((cat: Catalogue) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatalogueId(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 border transition-all text-left rounded-none",
                      selectedCatalogueId === cat.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-muted-foreground/10 hover:border-primary/30 hover:bg-slate-50 bg-white",
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
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-muted-foreground font-medium">
                No active catalogues found.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          className="w-full h-12 font-bold text-sm rounded-none bg-primary hover:bg-primary/90 text-white shadow-none transition-all active:scale-[0.99]"
          disabled={!selectedCatalogueId || bulkAdd.isPending}
          onClick={handleConfirm}
        >
          {bulkAdd.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Bulk Assignment...
            </>
          ) : (
            `ASSIGN ${selectedProducts.length} PRODUCTS TO CATALOGUE`
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full h-10 font-semibold text-xs text-slate-400 hover:text-slate-600 hover:bg-transparent"
          onClick={() => onOpenChange(false)}
        >
          Cancel Operation
        </Button>
      </div>
    </FormSheet>
  );
}
