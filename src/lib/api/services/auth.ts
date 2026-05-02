import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types";

export const authService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/api/auth/login",
        request,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<LoginResponse["user"]> {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("user not authenticated");
    }

    const user = localStorage.getItem("user");
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(user);
  },

  async register(request: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/api/auth/register",
        request,
      );
      return response.data;
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
