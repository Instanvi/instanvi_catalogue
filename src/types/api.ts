/**
 * API Payloads & Interfaces
 * Derived from backend DTOs
 */

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

// --- Auth ---
export interface LoginPayload {
  identifier: string; // Email or phone
  code: string; // OTP
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  type: string;
  role: string;
  businessId: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface RequestOtpPayload {
  identifier: string; // Email or phone
}

// --- Business ---
export interface CreateBusinessPayload {
  name: string;
  slug?: string;
  logoUrl?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateBusinessPayload {
  name?: string;
  logoUrl?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  settings?: Record<string, unknown>;
  isActive?: boolean;
}

// --- Products ---
export interface ProductUnitPayload {
  name: string;
  price: string;
  conversionFactor: string | number;
  sku: string;
  isDefault?: boolean;
}

export interface ProductUnit extends ProductUnitPayload {
  id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  businessId: string;
  name: string;
  category?: string;
  description?: string;
  sku: string;
  slug?: string;
  images?: string[];
  specifications?: Record<string, unknown>;
  productType?: string;
  units?: ProductUnitPayload[];
}

export interface UpdateProductPayload {
  name?: string;
  category?: string;
  description?: string;
  sku?: string;
  images?: string[];
  specifications?: Record<string, unknown>;
  productType?: string;
  isActive?: boolean;
  units?: ProductUnitPayload[];
}

// --- Catalogues ---
export enum CatalogueType {
  PUBLIC = "public",
  PRIVATE = "private",
  COMMISSION = "commission",
}

export interface CreateCataloguePayload {
  name: string;
  description?: string;
  type?: CatalogueType;
  coverImageUrl?: string;
  allowCloning?: boolean;
  customerCategoryId?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateCataloguePayload {
  name?: string;
  description?: string;
  slug?: string;
  type?: CatalogueType;
  coverImageUrl?: string;
  allowCloning?: boolean;
  customerCategoryId?: string;
  isActive?: boolean;
  settings?: Record<string, unknown>;
}

export interface AddProductToCataloguePayload {
  productId: string;
  price: number;
  compareAtPrice?: number;
  displayOrder?: number;
  customNote?: string;
}

export interface BulkProductUnitPricePayload {
  productUnitId: string;
  price: number;
  compareAtPrice?: number;
}

export interface BulkProductPayload {
  productId: string;
  price: number;
  compareAtPrice?: number;
  displayOrder?: number;
  unitPrices: BulkProductUnitPricePayload[];
}

export interface BulkAddProductsPayload {
  products: BulkProductPayload[];
}

export interface UpdateCatalogueProductPayload {
  price?: number;
  compareAtPrice?: number;
  displayOrder?: number;
  customNote?: string;
  isHidden?: boolean;
}

export interface CloneCataloguePayload {
  customName?: string;
  description?: string;
  logoUrl?: string;
  iddrtth?: string; // Reference code
}

export interface RequestCatalogueAccessPayload {
  name: string;
  email?: string;
  phone?: string;
}

export interface UnlockCataloguePayload {
  code: string;
}

import { Catalogue } from "@/services/catalogues.service";

export interface VerifyAccessResponse {
  message: string;
  catalogue: Catalogue;
  access_token: string;
}

// --- Orders ---
export enum OrderType {
  B2B = "B2B",
  B2C = "B2C",
}

export interface OrderItemPayload {
  catalogueProductId: string;
  productUnitId?: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderPayload {
  type?: OrderType; // default B2C
  catalogueId: string;
  fromBusinessId?: string; // Seller (calculated from catalogue if missing)
  toBusinessId?: string; // Buyer (B2B)
  customerId?: string; // Buyer (B2C registered)

  // Guest B2C
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;

  items: OrderItemPayload[];
  notes?: string;
  paymentMethod?: "CASH" | "CARD" | "BANK_TRANSFER" | "MOBILE_MONEY" | "OTHER";
}

export interface UpdateOrderStatusPayload {
  status:
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "PAID";
}

// --- Customers ---
export interface RegisterCustomerPayload {
  name: string;
  email?: string; // At least one of email/phone is usually required by logic, but optional in DTO
  phone?: string;
  company?: string;
  address?: string;
  categoryId?: string;
  businessId?: string;
}

export interface VerifyCustomerOtpPayload {
  code: string;
  email?: string;
  phone?: string;
}

export interface UpdateCustomerPayload {
  name?: string;
  company?: string;
  address?: string;
  categoryId?: string;
}

// --- Notifications ---
export interface NotificationPayload {
  channel: "email" | "sms" | "whatsapp";
  categoryId?: string;
  title: string;
  message: string;
}

export interface NotificationHistory {
  id: string;
  businessId: string;
  channel: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  title: string;
  message: string;
  createdAt: string;
}
