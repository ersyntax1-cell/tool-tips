import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4,6}$/, "OTP must be 4-6 digits")
});

export type OTP = z.infer<typeof otpSchema>;
