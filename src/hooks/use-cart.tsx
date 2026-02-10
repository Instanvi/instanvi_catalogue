"use client";

import {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/components/catalogue/ProductItem";

export interface CartItem {
  id: string; // Product ID
  catalogueProductId?: string;
  catalogueId?: string;
  name: string;
  price: string;
  quantity: number;
  businessId?: string;
}

interface CartContextType {
  cart: CartItem[];
  updateCart: (product: Product, delta: number) => void;
  getQuantity: (productId: string) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
    return [];
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
            catalogueProductId: product.catalogueProductId,
            catalogueId: product.catalogueId,
            name: product.name,
            price: product.price,
            quantity: 1,
            businessId: product.businessId,
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

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, updateCart, getQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
