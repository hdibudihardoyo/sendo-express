// Authentication related types
import type { Permission } from "./role";

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

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    avatar?: string | null;
    role: {
      id: number;
      name: string;
      key: string;
      permissions?: Permission[];
    };
  };
}
