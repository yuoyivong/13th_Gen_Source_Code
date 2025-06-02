import { Gender } from "@/enum/gender";
import { z } from "zod";

const userInfoSchema = z.object({
  fullName: z.string().min(1, {
    message: "* Full Name cannot be empty.",
  }),
  gender: z.nativeEnum(Gender, { required_error: "* Gender cannot be empty." }),
  bio: z.string().optional(),
  profileUrl: z.string().optional(),
  email: z.string().optional(),
});

// expose schema
export { userInfoSchema };
