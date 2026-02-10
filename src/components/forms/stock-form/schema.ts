import * as z from "zod";

export const stockUpdateSchema = z.object({
  stockId: z.string().min(1, "Product stock record is required"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  reason: z.string().optional(),
});

export type StockUpdateValues = z.infer<typeof stockUpdateSchema>;
