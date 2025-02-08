import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .min(1, { message: "Name is required" }),
});

export interface FormModel {
  name: string;
}
