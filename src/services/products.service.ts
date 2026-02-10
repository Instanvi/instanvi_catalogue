import api from "../lib/axios";
import { ApiResponse, PaginatedData } from "../types/api";

export interface ProductUnit {
  id: string;
  productId: string;
  name: string;
  price: string;
  conversionFactor: string;
  sku: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description?: string | null;
  category?: string;
  sku: string;
  slug: string;
  images?: string[] | null;
  specifications: Record<string, unknown>;
  price: string;
  productType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  units: ProductUnit[];
}

export const productsService = {
  getAll: async (
    params: { page?: number; limit?: number; businessId?: string } = {},
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
