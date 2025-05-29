import { z } from "zod";

const romanticFormSchema = z.object({
  location: z.string().min(1, {
    message: "* Location cannot be empty.",
  }),
  date: z.date({ required_error: "* Date cannot be empty." }),
  gallery: z
    .custom<File>(
      (val) => val instanceof File, // Check if value is a File instance
      { message: "* Gallery cannot be empty." }
    )
    .refine(
      (file) => {
        if (!file) return false; // This should never happen due to the custom check above
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return allowedTypes.includes(file.type);
      },
      { message: "* Input file must be a JPEG, PNG, or JPG." }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "* Input file must be less than 5MB.",
    }),
  details: z.string().min(1, {
    message: "* Details cannot be empty.",
  }),
});

// expose schema
export { romanticFormSchema };
