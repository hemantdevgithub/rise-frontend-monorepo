import { z } from "zod";

export const addResearchAndDevelopmentValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  thumbnail: z.any(),
});

export const researchAndValidationFiltersSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
