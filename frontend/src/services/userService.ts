import { useAuth } from "react-oidc-context";
import { USER_ENDPOINT } from "../constants/endpoints";
import axios, { InternalAxiosRequestConfig } from "axios";

const auth = useAuth();

export async function getUsers() {
  const instance = axios.create({
    baseURL: USER_ENDPOINT.getUsers,
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (auth.user?.access_token) {
      config.headers.set("Authorization", `Bearer ${auth.user.access_token}`);
    }
    return config;
  });

  return instance;
}
