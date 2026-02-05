import * as zod from "zod";

export const otpSchema = zod.object({
  code: zod.string().length(6, "OTP must be 6 digits"),
  identifier: zod.string().min(1, "Identifier is required"),
});

export type OtpFormValues = zod.infer<typeof otpSchema>;
