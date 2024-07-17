import axios from "axios";
import { AuthResponse } from "../interfaces";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${baseURL}/api/auth/refreshtoken`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.error("no auth");
      }
    }
    throw error;
  }
);

export default $api;
