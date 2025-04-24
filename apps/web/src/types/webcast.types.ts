import { TFile } from "./file.types";

export interface TWebcast {
  id: string;
  slug?: string;
  title: string;
  videoUrl: string;
  description: string;
  category: string;
  subCategory: string;
  authorId: string;
  fileId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  image?: TFile;
}
