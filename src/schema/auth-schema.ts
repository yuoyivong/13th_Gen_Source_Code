import { z } from "zod";

// login schema contains only email and password fields
const loginSchema = z.object({
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

// register schema contains email, password, confirm password, and full name
const signUpSchema = z
  .object({
    fullName: z.string().min(1, {
      message: "* Full Name cannot be empty.",
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "* Confirm password do not match with password.",
    path: ["confirmPassword"],
  });

// expose method
export { loginSchema, signUpSchema };
