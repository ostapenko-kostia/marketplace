import { makeAutoObservable } from "mobx";
import { AuthResponse, IUser } from "../../interfaces";
import AuthService from "../AuthService";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    try {
      const response = await AuthService.register(
        first_name,
        last_name,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(
        `${BASE_URL}/api/auth/refresh`,
        { withCredentials: true }
      );
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
}
