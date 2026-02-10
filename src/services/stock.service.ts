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
      let organizationId = "";
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            organizationId = user.organizationId;
          } catch (e) {
            console.error("Failed to parse user from local storage", e);
          }
        }
      }

      if (!organizationId) {
        console.warn("No organization ID found for stock fetch");
        return [];
      }

      const response = await productsService.getAll(organizationId);

      const products = Array.isArray(response) ? response : response.data || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return products.map((product: any) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        currentStock: 100, // Simulated stock until backend supports it
        lowStockThreshold: 10,
        status: "in_stock",
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
