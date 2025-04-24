import { z } from "zod";

export const addLessonValidationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  thumbnail: z.any(),
  type: z.string().optional(),
  segmentId: z.string(),
});

export const createChapterValidationSchema = z.object({
  chapterTitle: z.string(),
  lessonId: z.string(),
  content: z.string(),
  thumbnail: z.any().optional(),
});
