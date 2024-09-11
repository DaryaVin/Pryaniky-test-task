import { AuthItem, AuthResponse } from "@/Entities/User";
import { $api, urlEndpoints } from "@/Shared/API";
import { AxiosResponse } from "axios";

export class AuthService {
  static async login(
    authItem: Omit<AuthItem, "id">
  ): Promise<AxiosResponse<AuthResponse>> {
    const { username, password } = authItem;
    return $api.post<AuthResponse>(
      urlEndpoints.AUTH.login,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
  }
}
