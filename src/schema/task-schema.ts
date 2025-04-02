import { z } from "zod";

export const taskSchema = z.object({
  taskTitle: z.string().min(1, {
    message: "* Task title cannot be empty.",
  }),
  tag: z.string().min(1, {
    message: "* Please select the tag.",
  }),
  endDate: z
    .date({ required_error: "* End date cannot be empty." })
    .refine((date) => date >= new Date(), {
      message: "* End date cannot be in the past.", // Ensure date is not in the past
    }),
  taskDetails: z.string().optional(),
});
