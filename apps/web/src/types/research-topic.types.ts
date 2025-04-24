import { TResearch } from "./research.types";

export type TResearchTopicStatus = "OPEN" | "CLOSED" | "PUBLISHED";

export interface TResearchTopic {
  id: string;
  postedBy: string;
  name: string;
  description: string;
  price: number;
  fileId: string;
  postedDate: Date;
  duration: Date;
  publishedResearchId: string;
  status: TResearchTopicStatus;
  createdAt: Date;
  updatedAt: Date;

  publishedResearch: TResearch;
}
