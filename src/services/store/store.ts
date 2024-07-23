import { IUser } from "../../interfaces";
import { makeAutoObservable } from "mobx";
import AuthService from "../AuthService";
import axios from "axios";
import { API_URL } from "..";

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
      localStorage.setItem("access-token", response.data.access_token);
      localStorage.setItem("refresh-token", response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
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

  async checkAuth(refresh_token: string | null) {
    if (refresh_token) {
      try {
        const response = await axios.post(
          `${API_URL}api/auth/refreshtoken`,
          { token: refresh_token },
          { withCredentials: true }
        );
        localStorage.setItem("access-token", response.data.access_token);
        this.setAuth(true);
        this.setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setUser({} as IUser);
      this.setAuth(false);
    }
  }
}
