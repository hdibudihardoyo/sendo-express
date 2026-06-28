import { z } from "zod";

export const scanShipmentSchema = z.object({
  trackingNumber: z.string().min(1, "Nomor resi wajib diisi").trim(),
  type: z.enum(["IN", "OUT"], {
    errorMap: () => ({ message: "Pilih tipe scan: IN atau OUT" }),
  }),
  isReadyToPickup: z.boolean().default(false),
});

export type ScanShipmentFormData = z.input<typeof scanShipmentSchema>;
