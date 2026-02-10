"use client";

import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: string;
  compareAtPrice?: string | null;
  images: string[];
  category?: string;
  description?: string;
  unit?: string;
  sku?: string;
}

interface ProductItemProps {
  product: Product;
  quantity?: number;
  onAdd: () => void;
  onRemove: () => void;
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
  quantity = 0,
  onAdd,
  onRemove,
}: ProductItemProps) {
  const imageUrl = product.images[0] || "/placeholder-product.png";

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

      <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-bold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            unit={product.unit}
            className="text-base md:text-lg font-black text-foreground"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          {quantity > 0 ? (
            <QuantitySelector
              quantity={quantity}
              onAdd={onAdd}
              onRemove={onRemove}
              size="default"
            />
          ) : (
            <Button
              onClick={onAdd}
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
  quantity = 0,
  onAdd,
  onRemove,
}: ProductItemProps) {
  const imageUrl = product.images[0] || "/placeholder-product.png";

  return (
    <div className="group flex items-center gap-6 bg-white p-4 md:p-6 rounded-none border border-muted/50 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="h-20 w-20 md:h-28 md:w-28 flex-shrink-0 bg-muted/20 rounded-none overflow-hidden relative border border-muted/10">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-between gap-8">
        <div className="min-w-0 space-y-1.5">
          <h3 className="font-bold text-base md:text-xl line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description || "No description available"}
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            unit={product.unit}
            className="font-black text-base md:text-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pl-4 border-l border-muted/10">
        {quantity > 0 ? (
          <div className="flex items-center gap-3 bg-primary/5 rounded-none p-1 border border-primary/10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-10 w-10 text-primary hover:bg-primary hover:text-white rounded-none transition-all"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="font-bold text-base text-primary min-w-[1.5rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onAdd}
              className="h-10 w-10 text-primary hover:bg-primary hover:text-white rounded-none transition-all"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            onClick={onAdd}
            className="h-12 w-12 bg-primary text-white hover:bg-primary/90 shadow-none rounded-none transition-all duration-300"
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}
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
