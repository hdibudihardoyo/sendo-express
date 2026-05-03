import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/api/services/auth";
import { mediaService } from "@/lib/api/services/media";
import type {
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from "@/lib/api/types/profile";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),
    onSuccess: (data) => {
      // Update the user data in cache
      queryClient.setQueryData(["user", "auth"], data);
      toast.success("Profile updated successfully!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) =>
      authService.updatePassword(data),
    onSuccess: (data) => {
      // Update the user data in cache if needed
      queryClient.setQueryData(["user", "auth"], data);
      toast.success("Password updated successfully!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to update password. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: (file: File) => mediaService.uploadSingle(file),
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!");
      return data.fileUrl;
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to upload image. Please try again.";
      toast.error(errorMessage);
      throw error;
    },
  });
};
