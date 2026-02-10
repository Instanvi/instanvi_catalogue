import api from "../lib/axios";
import type {
  CreateBusinessPayload,
  UpdateBusinessPayload,
} from "../types/api";

export const businessesService = {
  getAll: async () => {
    const response = await api.get("/businesses");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },

  create: async (data: CreateBusinessPayload) => {
    const response = await api.post("/businesses", data);
    return response.data;
  },

  update: async (id: string, data: UpdateBusinessPayload) => {
    const response = await api.patch(`/businesses/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/businesses/${id}`);
    return response.data;
  },
};
