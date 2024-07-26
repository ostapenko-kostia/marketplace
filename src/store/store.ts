import { create } from "zustand";
import { IUser } from "../interfaces";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../services";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  login: (email: string, password: string, cb: ()=>void) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  checkAuth: (refresh_token: string | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {} as IUser,
  isAuth: false,
  login: async (email: string, password: string, cb?: ()=>void) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("access-token", response.data.access_token);
      localStorage.setItem("refresh-token", response.data.refresh_token);
      set({ user: response.data.userDetails });
      set({ isAuth: true });
      if (cb) cb()
    } catch (error) {
      alert("Incorrect email or password")
    }
  },
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      await AuthService.register(firstName, lastName, email, password);
    } catch (error) {
      //   console.error(error);
    }
  },
  checkAuth: async (refresh_token: string | null) => {
    if (refresh_token) {
      try {
        const response = await axios.post(`${API_URL}api/auth/refreshtoken`, { token: refresh_token }, { withCredentials: true });
        localStorage.setItem("access-token", response.data.access_token);
        set({ user: response.data.userDetails });
        set({ isAuth: true });
      } catch (error) {
        // console.error(error);
      }
    } else {
      set({ user: {} as IUser });
      set({ isAuth: false });
    }
  },
}));
