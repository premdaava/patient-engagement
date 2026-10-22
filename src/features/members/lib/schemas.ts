import { z } from "zod";

export const registerMemberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be under 100 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long"),
  smsOptIn: z.boolean().default(false),
  emailOptIn: z.boolean().default(false),
});

export type RegisterMemberInput = z.infer<typeof registerMemberSchema>;
