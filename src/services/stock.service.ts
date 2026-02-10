import { productsService } from "./products.service";

export interface StockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastUpdated: string;
}

export const stockService = {
  getAll: async () => {
    try {
      const response = await productsService.getAll();

      const products = Array.isArray(response)
        ? response
        : response.items || [];

      interface Product {
        id: string;
        name: string;
        sku: string;
        updatedAt?: string;
      }

      return products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        currentStock: 100, // Simulated stock until backend supports it
        lowStockThreshold: 10,
        status: "in_stock" as const,
        lastUpdated: product.updatedAt || new Date().toISOString(),
      })) as StockItem[];
    } catch (error) {
      console.error("Failed to fetch products for stock", error);
      return [];
    }
  },

  update: async (id: string, data: Partial<StockItem>) => {
    // const response = await api.patch(`/inventory/${id}`, data);
    return data;
  },
};
