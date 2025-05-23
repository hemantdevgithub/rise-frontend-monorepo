export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  LEARNER = "LEARNER",
  RESEARCHER = "RESEARCHER",
  IMPACT_ENTITY = "IMPACT_ENTITY",
  IMPACT_INVESTOR = "IMPACT_INVESTOR",
  BUSINESS = "BUSINESS",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  BLOCKED = "BLOCKED",
  DEACTIVATED = "DEACTIVATED",
}

export type TRoleType = `${UserRole}`;
