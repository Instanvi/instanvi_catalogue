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
}

export function CartFooter({ items, onCheckout }: CartFooterProps) {
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
          <div className="bg-primary text-white rounded-none p-6 flex items-center justify-between cursor-pointer hover:bg-primary/95 transition-all group active:opacity-90 border-t border-primary">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 h-10 w-10 rounded-none flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-5 w-5 rounded-none flex items-center justify-center border-2 border-black">
                  {totalItems}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/60 font-medium">
                  Your selection
                </p>
                <p className="font-bold text-lg leading-tight">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XAF",
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span className="font-bold text-sm tracking-wide uppercase">
                View Order
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-none h-[80vh] bg-white border-none p-0"
        >
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-none">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <SheetTitle className="text-2xl font-bold">Your Order</SheetTitle>
            </div>
          </SheetHeader>

          <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted rounded-none flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-base">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base">
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

          <div className="p-6 bg-muted/20 border-t mt-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg text-muted-foreground font-medium">
                Total Amount
              </span>
              <span className="text-3xl font-black">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "XAF",
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
            <Button
              onClick={onCheckout}
              className="w-full h-16 bg-primary text-white hover:bg-primary/90 text-lg font-bold rounded-none transition-all shadow-none"
            >
              Confirm Selection
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
