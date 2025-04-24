import { SegmentTypes } from "@/constants/global.constant";
import { TFile } from "./file.types";

export type TLessonStatus =
  | "DRAFT"
  | "PENDING_EDITOR_REVIEW"
  | "IN_REVIEW_EDITOR"
  | "REVISIONS_REQUIRED_EDITOR"
  | "RESUBMITTED"
  | "READY_FOR_FINAL_APPROVAL"
  | "IN_FINAL_REVIEW"
  | "REJECTED"
  | "UNPUBLISHED"
  | "PUBLISHED";

export interface TLesson {
  id: string;
  title: string;
  description?: string;
  segmentId: string;
  slug?: string;
  fileId?: string;
  authorId: string;
  status: TLessonStatus;
  image?: TFile;
  createdAt: Date;
  updatedAt: Date;
}

export type TChapter = {
  id: string;
  chapterTitle: string;
  content: string;
  lessonId: string;
  fileId: string;
  slug: string;
  image: TFile;
  createdAt: string;
  updatedAt: string;
};

export type TLessonWithChapter = TLesson & {
  chapters?: TChapter[];
};

export type TLessonSegmentType =
  (typeof SegmentTypes)[keyof typeof SegmentTypes];

export type TLessonSegment = {
  id?: string;
  type: TLessonSegmentType;
  title: string;
  lessons?: TLessonWithChapter[];
  createdAt?: Date;
  updatedAt?: Date;
};
