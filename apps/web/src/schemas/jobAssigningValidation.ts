import { z } from "zod";

export const assignJobToSRMValidationSchema = z.object({
  srmIds: z.array(z.string()),
});
