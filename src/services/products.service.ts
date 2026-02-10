import api from "../lib/axios";
import { ApiResponse, PaginatedData } from "../types/api";

export interface Product {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  category?: string;
  sku: string;
  slug: string;
  images: string[];
  specifications: Record<string, unknown>;
  price: string;
  productType?: string;
  unit: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const productsService = {
  getAll: async (
    params: { page?: number; limit?: number; organizationId?: string } = {},
  ) => {
    const response = await api.get<ApiResponse<PaginatedData<Product>>>(
      "/products",
      { params },
    );
    return response.data.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string, data: FormData) => {
    const response = await api.patch(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
