// schema validation with zod
import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, {
    message: "* Username cannot be empty.",
  }),
  email: z
    .string()
    .min(1, {
      message: "* Email cannot be empty.",
    })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "* Invalid Email Address.",
    }),
  password: z.string().min(1, {
    message: "* Password cannot be empty.",
  }),
});

// login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "* Email cannot be empty.",
    })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "* Invalid Email Address.",
    }),
  password: z.string().min(1, {
    message: "* Password cannot be empty.",
  }),
});