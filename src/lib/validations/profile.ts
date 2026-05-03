import { z } from "zod";

// Validation schema for profile update
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  avatar: z.string().optional(), // URL string for avatar
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Validation schema for password update
export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password must not exceed 100 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "New password must contain at least one uppercase letter and one number",
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
