// Authentication related types

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone_number: string;
  avatar?: string | null;
  created_at: string;
  updated_at: string;
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

export type UserResponseData = Omit<LoginResponseData, "accessToken">;

export interface LoginResponse {
  accessToken: string;
  user: UserResponseData;
}

export interface RegisterResponse {
  user: UserResponseData;
}
