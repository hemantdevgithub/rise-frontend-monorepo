export type TCertificateType = "LESSON_ACHIEVEMENT" | "QUIZ_ACHIEVEMENT";

export interface TCertificate {
  id: string;
  certificateId: string;
  userId: string;
  type: TCertificateType;
  lessonId?: string;
  quizId?: string;
  issuing_date: Date;
  issuing_organization?: string;
  expiry_date: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export type OneCertificate = {
  certificateId: string;
  certificateSlug: string;
  course: string;
};
