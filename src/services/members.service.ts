import api from "../lib/axios";

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
    const response = await api.post("/auth/request-otp", { identifier });
    return response.data;
  },

  login: async (identifier: string, code: string) => {
    const response = await api.post("/auth/login", { identifier, code });
    return response.data;
  },
};
