import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import oktaAuth from "../config/oktaConfig";
import {
  UnauthorizedError,
  ForbiddenError,
  NetworkError,
  ServerError,
} from "./apiErrors";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // replace with actual API base
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────
// Attaches the Okta access token to every outgoing request
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const tokenManager = oktaAuth.tokenManager;
      const accessToken = await tokenManager.get("accessToken");

      if (accessToken && "accessToken" in accessToken) {
        config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
      }
    } catch {
      // token not available — request goes without auth header
      // the response interceptor will handle 401 if the API rejects it
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────
// Handles errors globally: token refresh, sign-out, error classification
axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response — network error (offline, DNS failure, CORS, timeout)
    if (!error.response) {
      return Promise.reject(new NetworkError());
    }

    const { status } = error.response;

    // 401 — Unauthorized: try refreshing the token once
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // attempt to get a fresh access token using the refresh token
        const freshTokens = await oktaAuth.tokenManager.renew("accessToken");

        if (freshTokens && "accessToken" in freshTokens) {
          // retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${freshTokens.accessToken}`;
          return axiosClient(originalRequest);
        }
      } catch {
        // refresh failed — session is dead, force sign out
        await oktaAuth.signOut();
        return Promise.reject(
          new UnauthorizedError("Session expired. Redirecting to login...")
        );
      }
    }

    // 401 after retry — refresh didn't help
    if (status === 401 && originalRequest._retry) {
      await oktaAuth.signOut();
      return Promise.reject(new UnauthorizedError());
    }

    // 403 — Forbidden
    if (status === 403) {
      return Promise.reject(new ForbiddenError());
    }

    // 500+ — Server errors
    if (status >= 500) {
      return Promise.reject(new ServerError());
    }

    // Everything else — pass through the API error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;