import { z } from "zod";

export const deliveryFormSchema = z.object({
  deliveryType: z.enum(["regular", "next_day", "same_day"], {
    errorMap: () => ({ message: "Pilih jenis pengiriman" }),
  }),

  destinationAddress: z.string().min(3, "Alamat pengiriman minimal 3 karakter"),

  packageType: z.string().min(3, "Pilih jenis paket"),

  pickupAddressId: z.coerce
    .number({ invalid_type_error: "Pilih lokasi jemput" })
    .min(1, "Pilih lokasi jemput"),

  recipientName: z.string().min(3, "Nama penerima minimal 3 karakter"),

  recipientPhone: z
    .string()
    .regex(/^\d{10,15}$/, "Nomor telepon tidak valid (10-15 digit angka)"),

  senderName: z.string().min(3, "Nama pengirim minimal 3 karakter"),

  senderPhone: z
    .string()
    .regex(/^\d{10,15}$/, "Nomor telepon tidak valid (10-15 digit angka)"),

  totalWeight: z
    .number({ invalid_type_error: "Berat harus berupa angka" })
    .positive("Berat harus lebih dari 0 gram"),
});

export const scanFormSchema = z.object({
  trackingNumber: z.string().min(1, "Wajib Masukkan nomor resi"),

  isReadyToPickup: z.boolean(),
});

export type DeliveryFormData = z.infer<typeof deliveryFormSchema>;
export type ScanFormData = z.infer<typeof scanFormSchema>;
