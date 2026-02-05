import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod.string().min(2, "Full name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(10, "Valid phone number is required"),
  company: zod.string().min(2, "Company name is required"),
  address: zod.string().optional(),
});

export type RegisterFormValues = zod.infer<typeof registerSchema>;
