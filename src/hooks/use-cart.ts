"use client";

import { useState, useCallback } from "react";
import { Product } from "@/components/catalogue/ProductItem";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const updateCart = useCallback((product: Product, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item,
        );
      }
      if (delta > 0) {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
      return prev;
    });
  }, []);

  const getQuantity = useCallback(
    (productId: string) => {
      return cart.find((item) => item.id === productId)?.quantity || 0;
    },
    [cart],
  );

  return { cart, updateCart, getQuantity };
}
