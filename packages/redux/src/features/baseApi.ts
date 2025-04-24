import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_API_URL + "/api/v1";

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Define the axiosBaseQuery function
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Variables for managing token refresh
let isRefreshing = false;
const hasMadeFirstRequest = sessionStorage.getItem("hasMadeFirstRequest") === "true";
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

// Function to process the queue of failed requests
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const noRefreshRoutes = ["/auth/login", "/auth/register", "/auth/refresh-session", "/auth/logout"];
// Function to check if a route should attempt token refresh
const shouldAttemptRefresh = (url: string): boolean => {
  return !noRefreshRoutes.some((route) => url.includes(route));
};

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!hasMadeFirstRequest) {
      sessionStorage.setItem("hasMadeFirstRequest", "true");
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!hasMadeFirstRequest || !shouldAttemptRefresh(originalRequest.url!)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + "/auth/refresh-session", {}, { withCredentials: true })
          .then(async (response) => {
            if (response.status === 200) {
              try {
                await axiosInstance.get(baseUrl + "/auth/me");
                processQueue(null);
                resolve(axiosInstance(originalRequest));
              } catch (err) {
                processQueue(err, null);
                reject(err);
              }
            } else {
              processQueue(new Error("Token refresh failed"), null);
              reject(new Error("Token refresh failed"));
            }
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

// Create the baseApi using RTK Query
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["auth", "categories", "seller", "products", "orders", "attributes"],
});
