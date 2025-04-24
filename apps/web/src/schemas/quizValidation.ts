import { z } from "zod";

export const createQuizValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string(),
  lessonId: z.string().optional(),
  chapterId: z.string().optional(),
  hasCertificate: z.string(),
  redoOption: z.string(),
});

export const createQuestionValidationSchema = z.object({
  question: z.string(),
  timer: z.number(),
  correctOption: z.string(),
  options: z.array(
    z.object({
      value: z.string(),
    })
  ),
  type: z.enum(["quiz", "exam"]),
  quizId: z.string(),
  examId: z.string(),
});

export const createExamValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  lessonId: z.string(),
});
