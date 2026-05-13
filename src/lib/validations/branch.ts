import { z } from "zod";

// Branch schema
export const branchSchema = z.object({
  name: z
    .string()
    .min(1, "Nama cabang harus diisi")
    .min(3, "Nama cabang minimal 3 karakter")
    .max(100, "Nama cabang maksimal 100 karakter"),
  address: z
    .string()
    .min(1, "Alamat harus diisi")
    .max(255, "Alamat maksimal 255 karakter")
    .min(3, "Alamat minimal 3 karakter"),
  phoneNumber: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(20, "Nomor telepon maksimal 20 digit")
    .regex(
      /^08[1-9][0-9]{10,20}$/,
      "Format nomor telepon tidak valid (contoh: 08123456789)",
    ),
});

// Type exports
export type BranchFormData = z.infer<typeof branchSchema>;
