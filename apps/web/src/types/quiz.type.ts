export type TQuestionType = "multiple-choice";
export type TRedoQuiz = "yes" | "no";

export type TQuizType = "lesson" | "unified";
export interface TQuiz {
  id: string;
  title: string;
  description: string;
  type: TQuizType; // for lesson chapter or unified
  lessonId?: string; // if unified, then null
  chapterId?: string; // if unified, then null
  hasCertificate: boolean; // if unified then might have a certificate
  authorId: string;
  redoOption: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TQuizQuestion {
  id: string;
  quizId: string;
  question: string;
  timer: number;
  correctOption: string;
  options: string[];
  type: TQuestionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TQuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  totalScore: number;
  score: number;
  attempts?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export type TQuizWithQuestions = TQuiz & {
  quizQuestions: TQuizQuestion[];
};
