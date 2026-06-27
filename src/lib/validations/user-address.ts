import { z } from "zod";

export const createUserAddressSchema = z.object({
  address: z
    .string()
    .min(3, "Alamat minimal 3 karakter")
    .max(255, "Alamat maksimal 255 karakter"),

  tag: z.string().optional(),
  label: z.string().optional(),
  photo: z.string().optional(),
});

export const updateUserAddressSchema = z.object({
  address: z.string().max(255, "Alamat maksimal 255 karakter").optional(),
  tag: z.string().optional(),
  label: z.string().optional(),
  photo: z.string().optional(),
});

export type CreateUserAddressFormData = z.infer<typeof createUserAddressSchema>;
export type UpdateUserAddressFormData = z.infer<typeof updateUserAddressSchema>;
