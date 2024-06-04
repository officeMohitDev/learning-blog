import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters long" })
    .max(25, { message: "Username must be no longer than 25 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "Username can only contain alphanumeric characters without spaces",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
  name: z
    .string({ required_error: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(30, { message: "Name must be no longer than 30 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});
