import * as z from "zod";

export const businessLoginSchema = z.object({
  identifier: z.string().min(3, "Please enter your email or phone number"),
});

export const businessRegisterSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name requires at least 2 characters"),
  industry: z.string().optional(),
  adminName: z.string().min(2, "Admin name requires at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().optional(),
});

export type BusinessLoginFormValues = z.infer<typeof businessLoginSchema>;
export type BusinessRegisterFormValues = z.infer<typeof businessRegisterSchema>;
