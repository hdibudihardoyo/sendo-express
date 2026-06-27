import { z } from "zod";

export const pickUpShipmentSchema = z.object({
  pickupProofImageUrl: z.string().min(3, "Bukti penjemputan wajib diunggah"),
});

export const deliverToCustomerSchema = z.object({
  receiptProofImageUrl: z.string().min(3, "Bukti penerimaan wajib diunggah"),
});

export type PickUpShipmentFormData = z.infer<typeof pickUpShipmentSchema>;
export type DeliverToCustomerFormData = z.infer<typeof deliverToCustomerSchema>;
