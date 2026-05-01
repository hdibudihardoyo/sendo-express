import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string()
    .max(100, "Password maksimal 100 karakter")
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama wajib diisi")
      .min(2, "Nama minimal 2 karakter")
      .max(100, "Nama maksimal 100 karakter"),

    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),

    password: z
      .string()
      .max(100, "Password maksimal 100 karakter")
      .min(1, "Password wajib diisi")
      .min(8, "Password minimal 8 karakter"),

    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
