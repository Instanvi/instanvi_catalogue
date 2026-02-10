import * as zod from "zod";

export const productSchema = zod.object({
  name: zod.string().min(2, "Product name is required"),
  description: zod.string().optional(),
  price: zod
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (e.g. 10.99)")
    .default("0.00"),
  sku: zod.string().min(1, "SKU is required"),
  category: zod.string().optional(),
  unit: zod.string().optional(),
  productType: zod.string().optional(),
  images: zod.any().optional(),
});

export type ProductFormValues = zod.infer<typeof productSchema>;
