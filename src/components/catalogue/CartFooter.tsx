"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartFooterProps {
  items: CartItem[];
  onCheckout: () => void;
  onClear: () => void;
}

export function CartFooter({ items, onCheckout, onClear }: CartFooterProps) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-40">
      <Sheet>
        <SheetTrigger asChild>
          <div className="bg-primary text-white rounded-none p-2.5 sm:p-3 md:p-6 flex items-center justify-between cursor-pointer hover:bg-primary/95 transition-all group active:opacity-90 border-t border-primary">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="bg-white/20 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-none flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] sm:text-[9px] md:text-[10px] font-bold h-4 w-4 sm:h-5 sm:w-5 rounded-none flex items-center justify-center border border-black md:border-2">
                  {totalItems}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-white/60 font-medium">
                  Your selection
                </p>
                <p className="font-bold text-xs sm:text-base md:text-lg leading-tight truncate">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XAF",
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 group-hover:translate-x-1 transition-transform flex-shrink-0">
              <span className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wide uppercase hidden sm:block">
                View
              </span>
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-none h-[85vh] sm:h-[80vh] bg-white border-none p-0"
        >
          <SheetHeader className="p-3 sm:p-4 md:p-6 border-b">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-none">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <SheetTitle className="text-lg sm:text-2xl font-bold">Your Order</SheetTitle>
            </div>
          </SheetHeader>

          <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-180px)] sm:max-h-[calc(80vh-180px)] space-y-3 sm:space-y-4 md:space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 sm:gap-4">
                <div className="h-14 w-14 sm:h-16 sm:w-16 bg-muted rounded-none flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm sm:text-base leading-tight line-clamp-2">{item.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm sm:text-base">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "XAF",
                      minimumFractionDigits: 0,
                    }).format(parseFloat(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 sm:p-4 md:p-6 bg-muted/20 border-t mt-auto absolute bottom-0 left-0 right-0">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="text-base sm:text-lg text-muted-foreground font-medium">
                Total
              </span>
              <span className="text-xl sm:text-3xl font-black leading-tight">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "XAF",
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <Button
                variant="outline"
                onClick={onClear}
                className="flex-1 h-10 sm:h-12 md:h-14 border-primary/20 text-primary hover:bg-primary/5 rounded-none font-bold uppercase tracking-wider text-xs sm:text-sm"
              >
                Clear
              </Button>
              <Button
                onClick={onCheckout}
                className="flex-[2] h-10 sm:h-12 md:h-14 bg-primary text-white hover:bg-primary/90 rounded-none font-bold uppercase tracking-wider shadow-none text-xs sm:text-sm"
              >
                Checkout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
