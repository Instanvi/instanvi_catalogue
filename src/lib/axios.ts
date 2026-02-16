import axios, { isAxiosError } from "axios";
import { ApiError } from "@/types/api";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://instanvi-catalogue-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const catalogueToken = localStorage.getItem("catalogue_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (catalogueToken) {
      // If no main session, use catalogue token for Authorization too (for guest access)
      config.headers.Authorization = `Bearer ${catalogueToken}`;
    }

    if (catalogueToken) {
      config.headers["x-catalogue-token"] = catalogueToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ApiError>(error)) {
    const apiError = error.response?.data;
    if (
      apiError?.errors &&
      Array.isArray(apiError.errors) &&
      apiError.errors.length > 0
    ) {
      return apiError.errors.join(", ");
    }
    return apiError?.message || error.message || "An unexpected error occurred";
  }
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred";
};

export default api;
