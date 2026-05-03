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
      queryClient.setQueryData(["user", "auth"], data);
      toast.success("Profile berhasil diperbarui!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal memperbarui profile. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) =>
      authService.updatePassword(data),
    onSuccess: () => {
      // Password update tidak return user data — invalidate saja jika perlu
      queryClient.invalidateQueries({ queryKey: ["user", "auth"] });
      toast.success("Password berhasil diperbarui!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal memperbarui password. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: (file: File) => mediaService.uploadSingle(file),
    onSuccess: () => {
      toast.success("Gambar berhasil diunggah!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal mengunggah gambar. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

export const useUploadMultipleMedia = () => {
  return useMutation({
    mutationFn: (files: File[]) => mediaService.uploadMultiple(files),
    onSuccess: () => {
      toast.success("Gambar berhasil diunggah!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal mengunggah gambar. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

export const useRemoveMedia = () => {
  return useMutation({
    mutationFn: (publicId: string) => mediaService.removeMedia(publicId),
    onSuccess: () => {
      toast.success("Gambar berhasil dihapus!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal menghapus gambar. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};
