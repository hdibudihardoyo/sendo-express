import { z } from "zod";

// Validation schema for profile update
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nama Lengkap wajib diisi")
    .max(100, "Nama Lengkap maksimal 100 karakter"),
  avatar: z.string().optional(), // URL string for avatar
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Validation schema for password update
export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Kata sandi lama wajib diisi"),

    newPassword: z
      .string()
      .min(8, "Kata sandi baru minimal 8 karakter")
      .max(100, "New password must not exceed 100 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Kata sandi harus mengandung minimal 1 huruf besar dan 1 angka",
      ),
    confirmNewPassword: z
      .string()
      .min(1, "Konfirmasi kata sandi baru wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Kata sandi baru dan konfirmasi tidak cocok",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
