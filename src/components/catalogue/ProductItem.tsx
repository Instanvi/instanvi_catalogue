"use client";

import { useState } from "react";

import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ProductUnit {
  id: string;
  productId: string;
  name: string;
  price: string;
  conversionFactor: string;
  sku: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  catalogueProductId?: string;
  catalogueId?: string;
  name: string;
  price: string;
  compareAtPrice?: string | null;
  images?: string[] | null;
  category?: string;
  description?: string | null;
  sku?: string;
  businessId?: string;
  units?: ProductUnit[];
}

interface ProductItemProps {
  product: Product;
  getQuantityForUnit: (unitId?: string) => number;
  onAdd: (unitId?: string, unitName?: string, unitPrice?: string) => void;
  onRemove: (unitId?: string) => void;
}

export function QuantitySelector({
  quantity,
  onAdd,
  onRemove,
  size = "default",
}: {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  size?: "default" | "sm";
}) {
  const isSm = size === "sm";
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full bg-primary/5 rounded-none border border-primary/10",
        isSm ? "p-0.5" : "p-1",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className={cn(
          "text-primary hover:bg-primary hover:text-white rounded-none transition-all",
          isSm ? "h-7 w-7" : "h-8 w-8",
        )}
      >
        <Minus className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </Button>
      <span
        className={cn("font-bold text-primary", isSm ? "text-xs" : "text-sm")}
      >
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onAdd}
        className={cn(
          "text-primary hover:bg-primary hover:text-white rounded-none transition-all",
          isSm ? "h-7 w-7" : "h-8 w-8",
        )}
      >
        <Plus className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </Button>
    </div>
  );
}

export function ProductCard({
  product,
  getQuantityForUnit,
  onAdd,
  onRemove,
}: ProductItemProps) {
  const [selectedUnit, setSelectedUnit] = useState<ProductUnit | undefined>(
    product.units?.find((u) => u.isDefault) || product.units?.[0],
  );

  const imageUrl = product.images?.[0] || "/placeholder-product.png";
  const quantity = getQuantityForUnit(selectedUnit?.id);

  const currentPrice = selectedUnit ? selectedUnit.price : product.price;

  return (
    <div className="group bg-white rounded-none border border-muted/50 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20">
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 md:p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-bold text-xs md:text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
          <PriceDisplay
            price={currentPrice}
            compareAtPrice={product.compareAtPrice}
            unit={selectedUnit?.name}
            className="text-sm md:text-base font-black text-foreground"
          />
        </div>

        {product.units && product.units.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {product.units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className={cn(
                  "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border transition-colors",
                  selectedUnit?.id === unit.id
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-muted-foreground border-muted-foreground/20 hover:border-primary/50",
                )}
              >
                {unit.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          {quantity > 0 ? (
            <QuantitySelector
              quantity={quantity}
              onAdd={() =>
                onAdd(selectedUnit?.id, selectedUnit?.name, selectedUnit?.price)
              }
              onRemove={() => onRemove(selectedUnit?.id)}
              size="default"
            />
          ) : (
            <Button
              onClick={() =>
                onAdd(selectedUnit?.id, selectedUnit?.name, selectedUnit?.price)
              }
              size="default"
              className="w-full h-11 bg-primary text-white hover:bg-primary/90 shadow-none rounded-none transition-all duration-300 text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Add to Cart</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductListItem({
  product,
  getQuantityForUnit,
  onAdd,
  onRemove,
}: ProductItemProps) {
  const [selectedUnit, setSelectedUnit] = useState<ProductUnit | undefined>(
    product.units?.find((u) => u.isDefault) || product.units?.[0],
  );

  const imageUrl = product.images?.[0] || "/placeholder-product.png";
  const quantity = getQuantityForUnit(selectedUnit?.id);
  const currentPrice = selectedUnit ? selectedUnit.price : product.price;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white p-3 md:p-4 rounded-none border border-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="flex items-start gap-3 md:gap-4 flex-1 w-full min-w-0">
        <div className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 bg-muted/20 rounded-none overflow-hidden relative border border-muted/10">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description || "No description available"}
          </p>

          {product.units && product.units.length > 1 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={cn(
                    "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border transition-colors",
                    selectedUnit?.id === unit.id
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-muted-foreground border-muted-foreground/20 hover:border-primary/50",
                  )}
                >
                  {unit.name}
                </button>
              ))}
            </div>
          )}

          <div className="sm:hidden pt-2 mt-auto">
            <PriceDisplay
              price={currentPrice}
              compareAtPrice={product.compareAtPrice}
              unit={selectedUnit?.name}
              className="font-black text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 sm:gap-1 pt-3 sm:pt-0 border-t sm:border-t-0 border-muted/10 sm:border-l sm:border-muted/10 sm:pl-4">
        <div className="hidden sm:block">
          <PriceDisplay
            price={currentPrice}
            compareAtPrice={product.compareAtPrice}
            unit={selectedUnit?.name}
            className="font-black text-base md:text-lg"
          />
        </div>

        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-primary/5 rounded-none p-1 border border-primary/10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(selectedUnit?.id)}
                className="h-8 w-8 md:h-9 md:w-9 text-primary hover:bg-primary hover:text-white rounded-none transition-all"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold text-sm md:text-base text-primary min-w-[1.25rem] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onAdd(
                    selectedUnit?.id,
                    selectedUnit?.name,
                    selectedUnit?.price,
                  )
                }
                className="h-8 w-8 md:h-9 md:w-9 text-primary hover:bg-primary hover:text-white rounded-none transition-all"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="icon"
              onClick={() =>
                onAdd(selectedUnit?.id, selectedUnit?.name, selectedUnit?.price)
              }
              className="h-9 w-9 md:h-10 md:w-10 bg-primary text-white hover:bg-primary/90 shadow-none rounded-none transition-all duration-300"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PriceDisplay({
  price,
  compareAtPrice,
  unit,
  className,
}: {
  price: string;
  compareAtPrice?: string | null;
  unit?: string;
  className?: string;
}) {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(parseFloat(price));

  const formattedComparePrice = compareAtPrice
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
        minimumFractionDigits: 0,
      }).format(parseFloat(compareAtPrice))
    : null;

  return (
    <div className="flex flex-col items-start md:items-end gap-0.5">
      {formattedComparePrice && (
        <span className="text-[10px] text-muted-foreground line-through decoration-primary/30">
          {formattedComparePrice}
        </span>
      )}
      <div className={cn("flex items-baseline gap-1", className)}>
        <span>{formattedPrice}</span>
        {unit && (
          <span className="text-[10px] text-muted-foreground font-normal normal-case">
            / {unit}
          </span>
        )}
      </div>
    </div>
  );
}
