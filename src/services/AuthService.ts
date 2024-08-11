import $api from ".";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/api/auth/authenticate", { email, password });
  }

  static async register(photo: File, firstName: string, lastName: string, email: string, password: string): Promise<void> {
    const formData = new FormData();
    formData.append("account_pic", photo);
    formData.append("register_data", JSON.stringify({ firstName, lastName, email, password }));
    return $api.post("/api/auth/register", formData);
  }

  static async resetPassword(email: string): Promise<void> {
    return $api.post("/api/auth/reset", { email });
  }

  static async changePassword(email: string, code: string, password: string): Promise<void> {
    return $api.post("/api/auth/changepassword", { email, code, password, repeatedPassword: password });
  }
}
