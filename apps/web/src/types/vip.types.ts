import { TBasicProfile } from "./basicProfile.types";

export type TVipProfile = {
  basicProfile: TBasicProfile;
  createdAt: string;
  current_role: string;
  email: string;
  email_verified: boolean;
  id: string;
  isDeleted: boolean;
  referredBy: null;
  referredUserRole: null;
  roles: string[];
  updatedAt: string;
};
