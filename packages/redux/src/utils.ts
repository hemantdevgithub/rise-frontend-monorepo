// utils/errorHandling.ts

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IApiError } from "@repo/utils/types";

export function isApiError(error: unknown): error is IApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    "message" in error &&
    "error" in error &&
    Array.isArray((error as IApiError).error)
  );
}

export function handleApiError(error: unknown): IApiError {
  if (isApiError(error)) {
    return error;
  }

  if (typeof error === "object" && error !== null && "data" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (typeof fetchError.data === "object" && fetchError.data !== null && "message" in fetchError.data) {
      return fetchError.data as IApiError;
    }
  }

  // Fallback error object
  return {
    data: null,
    success: false,
    message: "An unknown error occurred",
    error: [],
  };
}
