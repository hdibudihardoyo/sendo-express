import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LoginResponseData,
  RegisterRequest,
  RegisterResponse,
  UserResponseData,
} from "../types";
import type {
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from "../types/profile";

export const authService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponseData>>(
        "/api/auth/login",
        request,
      );

      const loginData = response.data.data;
      const { accessToken, ...user } = loginData;

      tokenService.setToken(accessToken);
      userService.setUser(user);

      return {
        accessToken,
        user,
      };
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    tokenService.removeToken();
    userService.removeUser();
  },

  async getCurrentUser(): Promise<LoginResponse["user"]> {
    const token = tokenService.getToken();
    if (!token) {
      throw new Error("user not authenticated");
    }

    const user = userService.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<ApiResponse<UserResponseData>>(
        "/api/auth/register",
        request,
      );

      return {
        user: response.data.data,
      };
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async updateProfile(
    request: UpdateProfileRequest,
  ): Promise<UserResponseData> {
    try {
      const response = await apiClient.patch<ApiResponse<UserResponseData>>(
        "/api/auth/profile",
        request,
      );
      const updateUser = response.data.data;

      userService.setUser(updateUser);

      return updateUser;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UserResponseData> {
    try {
      const response = await apiClient.patch<ApiResponse<UserResponseData>>(
        "/api/auth/password",
        request,
      );

      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};

export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  setToken(token: string): void {
    localStorage.setItem("accessToken", token);
  },

  removeToken(): void {
    localStorage.removeItem("accessToken");
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return Boolean(token);
  },
};

export const userService = {
  getUser(): LoginResponse["user"] | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser(user: LoginResponse["user"]): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem("user");
  },
};

export default authService;
