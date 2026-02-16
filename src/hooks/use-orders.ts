import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";
import { CreateOrderPayload, OrderType } from "@/types/api";
import { useCart } from "./use-cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import { AxiosError } from "axios";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersService.getOrders(),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => ordersService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create order", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status:
        | "PENDING"
        | "CONFIRMED"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED"
        | "PAID";
    }) => ordersService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated");
    },
    onError: (error) => {
      toast.error("Failed to update order status", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete order", {
        description: getErrorMessage(error),
      });
    },
  });
};

interface CheckoutValues {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  notes?: string;
  paymentMethod?:
    | "CASH"
    | "CARD"
    | "BANK_TRANSFER"
    | "MOBILE_MONEY"
    | "OTHER"
    | string;
}

export const useCheckout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CheckoutValues) => {
      if (cart.length === 0) {
        toast.error("Your cart is empty");
        throw new Error("EMPTY_CART");
      }

      // Try to find catalogueId from any item in the cart (for robustness)
      const catalogueId = cart.find((item) => item.catalogueId)?.catalogueId;

      if (!catalogueId) {
        toast.error(
          "Cart contains outdated items. Please clear your cart and re-add your products.",
          {
            duration: 5000,
            action: {
              label: "Clear Cart",
              onClick: () => {
                clearCart();
                router.push("/");
              },
            },
          },
        );
        throw new Error("CART_OUTDATED");
      }

      const orderData: CreateOrderPayload = {
        type: OrderType.B2C,
        catalogueId: catalogueId,
        shippingAddress: values.shippingAddress,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        items: cart.map((item) => {
          if (!item.catalogueProductId) {
            throw new Error(
              `Missing catalogue product ID for item: ${item.name}`,
            );
          }
          return {
            catalogueProductId: item.catalogueProductId!,
            productUnitId: item.unitId,
            quantity: item.quantity,
            unitPrice: parseFloat(item.price),
          };
        }),
        notes: values.notes,
        paymentMethod:
          values.paymentMethod === "PAY_ON_DELIVERY" ? "CASH" : "MOBILE_MONEY",
      };

      console.log("Creating order:", orderData);
      return ordersService.createOrder(orderData);
    },
    onSuccess: () => {
      toast.success("Order Placed Successfully! Redirecting...");
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.push("/dashboard/orders");
    },
    onError: (error: AxiosError) => {
      if (error.message === "EMPTY_CART" || error.message === "CART_OUTDATED") {
        return; // Already handled in mutationFn with toast
      }
      console.error(error);
      toast.error("Failed to place order.", {
        description: getErrorMessage(error),
      });
    },
  });
};
