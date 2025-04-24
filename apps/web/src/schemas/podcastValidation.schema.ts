import { z } from "zod";

export const createPodcastValidationSchema = z.object({
  title: z.string({ required_error: "Please enter a title." }),
  file: z.any(),
  description: z.string({ required_error: "Please enter a description." }),
});
