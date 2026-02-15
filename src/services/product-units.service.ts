import api from "../lib/axios";
import { ApiResponse } from "../types/api";

export interface ProductUnit {
  id: string;
  name: string;
  symbol: string;
  factor: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductUnitDto {
  name: string;
  symbol: string;
  factor?: string;
  description?: string;
  isActive?: boolean;
}

export const productUnitsService = {
  getAll: async () => {
    const response =
      await api.get<ApiResponse<ProductUnit[]>>("/product-units");
    return response.data.data;
  },

  create: async (data: CreateProductUnitDto) => {
    const response = await api.post<ApiResponse<ProductUnit>>(
      "/product-units",
      data,
    );
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreateProductUnitDto>) => {
    const response = await api.patch<ApiResponse<ProductUnit>>(
      `/product-units/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(
      `/product-units/${id}`,
    );
    return response.data.data;
  },
};
