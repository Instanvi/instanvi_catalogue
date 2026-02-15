import * as zod from "zod";

export const secondaryUnitSchema = zod.object({
  productUnitId: zod.string().uuid("Please select a unit"),
  price: zod.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  conversionFactor: zod.string().min(1, "Factor is required"),
  sku: zod.string().optional(),
});

export const productSchema = zod.object({
  name: zod.string().min(2, "Product name is required"),
  description: zod.string().optional(),
  productUnitId: zod.string().uuid("Please select a base unit"),
  price: zod.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  sku: zod.string().min(1, "SKU is required"),
  category: zod.string().optional(),
  productType: zod.string().optional(),
  images: zod.any().optional(),
  secondaryUnits: zod.array(secondaryUnitSchema).optional(),
});

export type ProductFormValues = zod.infer<typeof productSchema>;
