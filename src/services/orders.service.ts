import api from "../lib/axios";
import { CreateOrderPayload, UpdateOrderStatusPayload } from "../types/api";

export const ordersService = {
  createOrder: async (data: CreateOrderPayload) => {
    const response = await api.post("/orders", data);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (
    id: string,
    status: UpdateOrderStatusPayload["status"],
  ) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
  deleteOrder: async (id: string) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },
};
