import { z } from "zod";

export const baseSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be less than 50 characters."),

  email: z.email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password is too long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),

  confirmPassword: z.string(),

  //for saved address
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{4}$/, "Postal code must be 4 digits"),
  address: z.string().min(1, "Address is required"),
});
