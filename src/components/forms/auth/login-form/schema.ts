import * as zod from "zod";

export const loginSchema = zod.object({
  identifier: zod.string().min(3, "Please enter your email or phone number"),
});

export type LoginFormValues = zod.infer<typeof loginSchema>;
