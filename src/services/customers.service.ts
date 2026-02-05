import api from "../lib/axios";

export const customersService = {
  // Admin Endpoints
  getAll: async () => {
    const response = await api.get("/customers");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  create: async (data: unknown) => {
    const response = await api.post("/customers", data);
    return response.data;
  },

  update: async (id: string, data: unknown) => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },

  // Customer/Member Endpoints
  getProfile: async () => {
    const response = await api.get("/customers/profile");
    return response.data;
  },

  updateProfile: async (data: unknown) => {
    const response = await api.put("/customers/profile", data);
    return response.data;
  },
};

export const customerAuthService = {
  requestOtp: async (identifier: string) => {
    const response = await api.post("/auth/request-otp", { identifier });
    return response.data;
  },

  login: async (identifier: string, code: string) => {
    const response = await api.post("/auth/login", { identifier, code });
    return response.data;
  },
};
