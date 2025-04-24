import { TFile } from "./file.types";

export interface TWebinar {
  id: string;
  authorId: string;
  fileId?: string;
  slug: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;

  image?: TFile;
}
