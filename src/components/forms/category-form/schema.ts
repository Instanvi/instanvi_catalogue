import * as zod from "zod";

export const categorySchema = zod.object({
  name: zod.string().min(2, "Category name is required"),
  description: zod.string().optional(),
  discountPercentage: zod
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid percentage"),
  markupPercentage: zod
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid percentage"),
  priority: zod.coerce.number().int().min(0),
  isDefault: zod.boolean().default(false),
});

export type CategoryFormValues = zod.infer<typeof categorySchema>;
