"use client";

import { CheckoutForm } from "@/components/forms/checkout-form/CheckoutForm";
import { ordersService } from "@/services/orders.service";
import { useState } from "react";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock cart items (in a real app, from context or localStorage)
  const cartItems = [
    { productId: "prod_1", quantity: 2, unitPrice: 50 },
    { productId: "prod_2", quantity: 1, unitPrice: 120 },
  ];

  // Mock Seller
  const fromBusinessId = "biz_123";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckout = async (values: any) => {
    setIsLoading(true);
    try {
      const orderData = {
        ...values,
        fromBusinessId,
        items: cartItems,
      };

      console.log("Creating order:", orderData);
      await ordersService.createOrder(orderData);

      alert("Order Placed Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-none border border-muted-foreground/10 p-6 shadow-none">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <CheckoutForm onSubmit={handleCheckout} isLoading={isLoading} />
        </div>

        <div className="md:col-span-1 bg-white rounded-none border border-muted-foreground/10 p-6 shadow-none h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  Product {item.productId} (x{item.quantity})
                </span>
                <span>${item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>$220.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
