import * as zod from "zod";

export const customerSchema = zod
  .object({
    name: zod.string().min(2, "Name must be at least 2 characters"),
    email: zod.string().email("Invalid email").optional().or(zod.literal("")),
    phone: zod
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .optional()
      .or(zod.literal("")),
    company: zod.string().optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Please provide at least one contact method (email or phone)",
    path: ["email"],
  });

export type CustomerFormValues = zod.infer<typeof customerSchema>;
