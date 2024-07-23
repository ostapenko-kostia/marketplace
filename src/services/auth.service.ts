import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.options = {
  "Content-Type": "application/json",
};

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("access-token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  } else {
    config.headers.Authorization = "none";
  }
  return config;
});

export const AuthService = {
  async login(email: string, password: string) {
    return axios.post("api/auth/authenticate", { email, password });
  },

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    return axios.post("api/auth/register", {
      first_name,
      last_name,
      email,
      password,
    });
  },
};
