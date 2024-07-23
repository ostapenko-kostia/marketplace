import $api from ".";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("api/auth/authenticate", { email, password });
  }
  
  static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<void> {
    return $api.post("api/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  }
}
