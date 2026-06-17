import { z } from "zod";

export const scanShipmentSchema = z.object({
  trackingNumber: z.string().min(1, "Nomor resi wajib diisi").trim(),

  type: z.enum(["IN", "OUT"], {
    errorMap: () => ({ message: "Pilih tipe scan: IN atau OUT" }),
  }),

  isReadyToPickup: z.boolean().optional(),
});

export type ScanShipmentFormData = z.infer<typeof scanShipmentSchema>;
