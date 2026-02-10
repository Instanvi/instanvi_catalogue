import * as zod from "zod";

export const unitSchema = zod.object({
  name: zod.string().min(1, "Unit name is required"),
  price: zod
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
    .default("0.00"),
  conversionFactor: zod.string().default("1"),
  sku: zod.string().min(1, "Unit SKU is required"),
  isDefault: zod.boolean().default(false),
});

export const productSchema = zod.object({
  name: zod.string().min(2, "Product name is required"),
  description: zod.string().optional(),
  price: zod.string().optional(), // Base price for display/defaults
  sku: zod.string().min(1, "SKU is required"),
  category: zod.string().optional(),
  productType: zod.string().optional(),
  images: zod.any().optional(),
  units: zod.array(unitSchema).min(1, "At least one unit is required"),
});

export type ProductFormValues = zod.infer<typeof productSchema>;
