import { UserRole } from "@/constants/roles";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TSelectOptions = { label: string; value: string }[];

export type TKeyLabel = {
  label: string;
  value: string;
};

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: [{ path: string; message: string }];
  };
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  error?: TError;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TUser = {
  email: string;
  exp: number;
  iat: number;
  role: UserRole;
  userId: string;
};

export type TLabelValuePair = {
  label: string;
  value: string;
};
