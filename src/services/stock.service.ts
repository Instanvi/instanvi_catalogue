import api from "../lib/axios";
import { ApiResponse } from "../types/api";
import { Product } from "./products.service";

export interface StockItem {
  id: string;
  businessId: string;
  productId: string;
  quantity: string;
  lowStockThreshold: string;
  location: string | null;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export const stockService = {
  getAll: async () => {
    const response = await api.get<ApiResponse<StockItem[]>>("/stocks");
    return response.data.data;
  },

  update: async (id: string, data: { quantity: number; reason?: string }) => {
    const response = await api.patch<ApiResponse<StockItem>>(
      `/stocks/${id}`,
      data,
    );
    return response.data.data;
  },
};
