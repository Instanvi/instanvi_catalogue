"use client";

import { CheckoutForm } from "@/components/forms/checkout-form/CheckoutForm";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateOrderPayload } from "@/types/api";
import { useCreateOrder } from "@/hooks/use-orders";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const totalAmount = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckout = async (values: any) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Assuming all items are from the same business for now
    // In a multi-vendor scenario, we would need to group by businessId or block mixed carts
    const businessId = cart[0].businessId;

    if (!businessId) {
      toast.error("Invalid cart data: Missing business information");
      return;
    }

    try {
      const orderData: CreateOrderPayload = {
        ...values,
        fromBusinessId: businessId,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: parseFloat(item.price),
        })),
        notes: values.notes,
      };

      console.log("Creating order:", orderData);
      await createOrder(orderData);

      toast.success("Order Placed Successfully! Redirecting...");
      clearCart();
      router.push("/dashboard/orders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to proceed with checkout.
          </p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:underline font-medium"
          >
            Go back to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-none border border-muted-foreground/10 p-6 shadow-none">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <CheckoutForm onSubmit={handleCheckout} isLoading={isPending} />
        </div>

        <div className="md:col-span-1 bg-white rounded-none border border-muted-foreground/10 p-6 shadow-none h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XAF",
                  }).format(parseFloat(item.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XAF",
              }).format(totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
