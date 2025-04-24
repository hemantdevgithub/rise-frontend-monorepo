import { TFile } from "./file.types";

export type TPodcast = {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  file: TFile;
};
