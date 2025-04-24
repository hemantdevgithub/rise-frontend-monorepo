import { z } from "zod";

export const createWebinarValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  subCategory: z.string(),
  thumbnail: z.any(),
});

export const registerWebinarValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});
