import api from "../lib/axios";
import type {
  CreateCataloguePayload,
  UpdateCataloguePayload,
  UpdateCatalogueProductPayload,
  CloneCataloguePayload,
  AddProductToCataloguePayload,
  BulkAddProductsPayload,
  RequestCatalogueAccessPayload,
  UnlockCataloguePayload,
  ApiResponse,
  PaginatedData,
} from "../types/api";

import { Product } from "./products.service";

export interface CatalogueProduct {
  id: string;
  catalogueId: string;
  productId: string;
  basePrice: string;
  compareAtPrice: string | null;
  isAvailable: boolean;
  displayOrder: number;
  customNote: string | null;
  isHidden: boolean;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogueProductItem {
  catalogueProduct: CatalogueProduct;
  product: Product;
}

export interface Catalogue {
  id: string;
  businessId: string;
  memberId?: string;
  originalCatalogueId?: string;
  name: string;
  slug: string;
  description?: string;
  type: "public" | "private" | "commission";
  coverImage?: string;
  logoUrl?: string;
  isActive: boolean;
  allowCloning: boolean;
  customerCategoryId?: string;
  isLocked?: boolean;
  settings?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  products?: CatalogueProductItem[];
}

export const cataloguesService = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Catalogue[]>>("/catalogues");
    return response.data.data;
  },

  getOne: async (id: string) => {
    const response = await api.get<ApiResponse<Catalogue>>(`/catalogues/${id}`);
    return response.data.data;
  },

  findById: async (id: string) => {
    const response = await api.get<ApiResponse<Catalogue>>(`/catalogues/${id}`);
    return response.data.data;
  },

  findBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<Catalogue>>(
      `/catalogues/view/${slug}`,
    );
    return response.data.data;
  },

  create: async (data: CreateCataloguePayload) => {
    const response = await api.post<ApiResponse<Catalogue>>(
      "/catalogues",
      data,
    );
    return response.data.data;
  },

  update: async (id: string, data: UpdateCataloguePayload) => {
    const response = await api.patch<ApiResponse<Catalogue>>(
      `/catalogues/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/catalogues/${id}`);
    return response.data.data;
  },

  // Catalogue Product Management
  addProduct: async (id: string, data: AddProductToCataloguePayload) => {
    const response = await api.post<ApiResponse<CatalogueProduct>>(
      `/catalogues/${id}/products`,
      data,
    );
    return response.data.data;
  },

  bulkAddProducts: async (id: string, data: BulkAddProductsPayload) => {
    const response = await api.post<ApiResponse<void>>(
      `/catalogues/${id}/products/bulk`,
      data,
    );
    return response.data.data;
  },

  getProducts: async (
    id: string,
    params: { page?: number; limit?: number } = {},
  ) => {
    const response = await api.get<
      ApiResponse<PaginatedData<CatalogueProductItem>>
    >(`/catalogues/${id}/products`, { params });
    return response.data.data;
  },

  updateProduct: async (
    id: string,
    productId: string,
    data: UpdateCatalogueProductPayload,
  ) => {
    // Note: The controller uses @Param('productId') so the ID in the URL is the one used.
    // The route is :id/products/:productId.
    const response = await api.patch(
      `/catalogues/${id}/products/${productId}`,
      data,
    );
    return response.data;
  },

  removeProduct: async (id: string, productId: string) => {
    const response = await api.delete(
      `/catalogues/${id}/products/${productId}`,
    );
    return response.data;
  },

  // Private Catalogue Access
  requestAccess: async (id: string, data: RequestCatalogueAccessPayload) => {
    const response = await api.post(`/catalogues/${id}/request-access`, data);
    return response.data;
  },

  verifyAccess: async (id: string, data: UnlockCataloguePayload) => {
    const response = await api.post(`/catalogues/${id}/verify-access`, data);
    return response.data;
  },

  // Member Cloning endpoints
  clone: async (id: string, customName?: string) => {
    const payload: CloneCataloguePayload = { customName };
    const response = await api.post(`/catalogues/${id}/clone`, payload);
    return response.data;
  },

  getMyClones: async () => {
    const response = await api.get(`/catalogues/my`);
    return response.data;
  },
};
