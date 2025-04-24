import { UserRole, UserStatus } from "@/constants/roles";
import { TBasicProfile } from "./basicProfile.types";

export type TUserStatus = `${UserStatus}`;
export type TRoleType = `${UserRole}`;

export type TUserProfile = {
  id: string;
  email: string;
  status: TUserStatus;
  role: TRoleType;
  password: string;
  passwordLastChanged: Date;
  passwordExpiresAt: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  basicProfile: TBasicProfile;
};
