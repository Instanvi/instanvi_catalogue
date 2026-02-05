import * as zod from "zod";

export const productSchema = zod.object({
  name: zod.string().min(2, "Product name is required"),
  description: zod.string().optional(),
  basePrice: zod
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (e.g. 10.99)"),
  sku: zod.string().optional(),
  images: zod.any().optional(),
  categoryPrices: zod.record(zod.string(), zod.string()).optional(),
});

export type ProductFormValues = zod.infer<typeof productSchema>;
