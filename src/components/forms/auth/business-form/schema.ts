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

export const createBusinessSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  logoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  description: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().optional(),
});

export type BusinessLoginFormValues = z.infer<typeof businessLoginSchema>;
export type BusinessRegisterFormValues = z.infer<typeof businessRegisterSchema>;
export type CreateBusinessFormValues = z.infer<typeof createBusinessSchema>;
