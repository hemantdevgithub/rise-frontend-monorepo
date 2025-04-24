export type TEnrollmentStatus = "ENROLLED" | "COMPLETED" | "IN_PROGRESS";

export type TEnrollment = {
  id: string;
  learnerId: string;
  courseId: string;
  status: TEnrollmentStatus;
  enrolledAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
