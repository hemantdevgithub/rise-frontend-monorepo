import { TUserProfile } from "./user.types";

export type TResearchStatus = "PENDING" | "PUBLISHED" | "REJECTED";

export interface TResearch {
  id: string;
  topicId: string;
  researcherId: string;
  title: string;
  content: string;
  status: TResearchStatus;
  fileId: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;

  author: TUserProfile;
}
