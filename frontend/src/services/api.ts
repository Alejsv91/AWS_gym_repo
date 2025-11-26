// src/services/api.ts
import axios, { AxiosInstance } from "axios";
import { useAuth } from "react-oidc-context";
import { InternalAxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function useApi(): AxiosInstance {
  const auth = useAuth();
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Interceptor to inject Cognito token
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (auth.user?.access_token) {
      config.headers.set("Authorization", `Bearer ${auth.user.access_token}`);
    }
    return config;
  });

  return instance;
}
