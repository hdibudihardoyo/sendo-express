// Authentication related types

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string; // "customer" | "super-admin" | "courier" | "admin-branch"
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  meta: {
    message: string;
    statusCode: number;
    success: boolean;
  };
  data: T;
}

export interface LoginResponseData {
  id: number;
  fullName: string;
  email: string;
  avatar?: string | null;
  role: string;
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
  user: Omit<LoginResponseData, "accessToken">;
}

export interface RegisterResponse {
  user: Omit<LoginResponseData, "accessToken">;
}
