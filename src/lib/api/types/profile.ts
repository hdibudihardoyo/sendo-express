// Legacy User interface for backward compatibility
export interface LegacyUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: {
    id: number;
    name: string;
    key: string;
  };
}

export interface UpdateProfileRequest {
  fullName?: string;
  avatar?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
