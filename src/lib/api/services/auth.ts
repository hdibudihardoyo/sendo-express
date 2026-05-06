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
  User,
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

      const { accessToken, ...user } = response.data.data;

      tokenService.setToken(accessToken);
      userService.setUser(user);

      return { accessToken, user };
    } catch (error) {
      throw new Error(handleAxiosError(error as AxiosErrorType));
    }
  },

  async logout(): Promise<void> {
    tokenService.removeToken();
    userService.removeUser();
  },

  async getCurrentUser(): Promise<User> {
    const token = tokenService.getToken();
    if (!token) throw new Error("User not authenticated");

    const user = userService.getUser();
    if (!user) throw new Error("User not found");

    return user;
  },

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<ApiResponse<User>>(
        "/api/auth/register",
        request,
      );

      return { user: response.data.data };
    } catch (error) {
      throw new Error(handleAxiosError(error as AxiosErrorType));
    }
  },

  async updateProfile(request: UpdateProfileRequest): Promise<User> {
    try {
      const response = await apiClient.patch<ApiResponse<User>>(
        "/api/auth/profile",
        request,
      );
      const updatedUser = response.data.data;
      userService.setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw new Error(handleAxiosError(error as AxiosErrorType));
    }
  },

  async updatePassword(request: UpdatePasswordRequest): Promise<User> {
    try {
      const response = await apiClient.patch<ApiResponse<User>>(
        "/api/auth/password",
        request,
      );

      return response.data.data;
    } catch (error) {
      throw new Error(handleAxiosError(error as AxiosErrorType));
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
    return Boolean(this.getToken());
  },
};

export const userService = {
  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  },

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem("user");
  },
};

export default authService;
