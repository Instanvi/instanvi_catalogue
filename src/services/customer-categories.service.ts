import api from "../lib/axios";

export interface CustomerCategory {
  id: string;
  businessId: string;
  name: string;
  discountPercentage: string;
  markupPercentage: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    customers: number;
  };
}

export const customerCategoriesService = {
  getAll: async () => {
    const response = await api.get("/customers/categories");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/customers/categories/${id}`);
    return response.data;
  },

  create: async (data: unknown) => {
    const response = await api.post("/customers/categories", data);
    return response.data;
  },

  update: async (id: string, data: unknown) => {
    const response = await api.patch(`/customers/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/customers/categories/${id}`);
    return response.data;
  },
};
