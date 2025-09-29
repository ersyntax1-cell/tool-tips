import { z } from "zod";

export const registerSchema = z.object({
    name: z.
        string()
        .min(4, 'The username must not be 4 characters long.'),
    email: z.
        string()
        .email('Invalid email.'),
    avatar: z.
        instanceof(File)
        .refine(file => file.size <= 5_000_000, "The file must be no more than 5 MB.")
        .optional(),
    password: z.
        string()
        .min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.
        string()
        .min(6, 'Confirm your password.'),
}).refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: "The passwords don't match"
})

export type RegisterForm = z.infer<typeof registerSchema>;