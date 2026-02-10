import * as z from "zod";

export const catalogueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.enum(["public", "private", "commission"]).default("public"),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  allowCloning: z.boolean().default(true),
  settings: z.any().optional(),
});

export type CatalogueFormValues = z.infer<typeof catalogueSchema>;
