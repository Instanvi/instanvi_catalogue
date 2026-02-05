import * as zod from "zod";

export const pricingSchema = zod.object({
  targetType: zod.enum(["member", "category"]),
  targetId: zod.string().min(1, "Target is required"),
  catalogueProductId: zod.string().min(1, "Product is required"),
  customPrice: zod.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
});

export type PricingFormValues = zod.infer<typeof pricingSchema>;
