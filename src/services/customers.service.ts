import api from "../lib/axios";
import type {
  RegisterCustomerPayload,
  UpdateCustomerPayload,
  RequestOtpPayload,
  LoginPayload,
} from "../types/api";

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

  create: async (data: RegisterCustomerPayload) => {
    const response = await api.post("/customers", data);
    return response.data;
  },

  update: async (id: string, data: UpdateCustomerPayload) => {
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

  updateProfile: async (data: UpdateCustomerPayload) => {
    const response = await api.put("/customers/profile", data);
    return response.data;
  },
};

export const customerAuthService = {
  requestOtp: async (identifier: string) => {
    const payload: RequestOtpPayload = { identifier };
    const response = await api.post("/auth/request-otp", payload);
    return response.data;
  },

  login: async (identifier: string, code: string) => {
    const payload: LoginPayload = { identifier, code };
    const response = await api.post("/auth/login", payload);
    if (response.data?.data?.access_token) {
      localStorage.setItem("token", response.data.data.access_token);
    }
    if (response.data?.data?.user) {
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },
};
