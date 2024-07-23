import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem("access-token"))
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  else config.headers.Authorization = "none";

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 || error.response.status == 403) {
      if (error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.post(
            `${API_URL}api/auth/refreshtoken`,
            { token: localStorage.getItem("refresh-token") },
            { withCredentials: true }
          );
          localStorage.setItem("access-token", response.data.access_token);
          return $api.request(originalRequest);
        } catch (error) {
          console.error("no auth");
        }
      }
    }
    throw error;
  }
);

export default $api;
