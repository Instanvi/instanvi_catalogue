import api from "../lib/axios";
import { RequestOtpPayload, LoginPayload } from "../types/api";

export const membersService = {
  getProfile: async () => {
    const response = await api.get("/members/profile");
    return response.data;
  },

  updateProfile: async (data: unknown) => {
    const response = await api.patch("/members/profile", data);
    return response.data;
  },

  // Added combined customer logic
  getCatalogues: async () => {
    const response = await api.get("/catalogues");
    return response.data;
  },
};

export const authService = {
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
