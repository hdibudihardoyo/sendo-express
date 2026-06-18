import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shipmentService } from "@/lib/api/services/shipment";
import { toast } from "react-hot-toast";
import type {
  CreateShipment,
  GetAllShipmentsParams,
} from "@/lib/api/types/shipment";

// Get all shipments dengan optional params (trackingNumber, page, limit)
export const useShipments = (params?: GetAllShipmentsParams) => {
  return useQuery({
    queryKey: ["shipments", params || "all"],
    queryFn: () => shipmentService.getAllShipments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get one shipment by ID
export const useShipmentById = (shipmentId: number) => {
  return useQuery({
    queryKey: ["shipments", shipmentId],
    queryFn: () => shipmentService.getOneShipment(shipmentId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Tracking shipment berdasarkan nomor resi (trackingNumber)
export const useTrackShipment = (trackingNumber: string) => {
  return useQuery({
    queryKey: ["shipments", "tracking", trackingNumber],
    queryFn: () => shipmentService.trackShipment({ trackingNumber }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Generate PDF Invoice
export const useGeneratePdfInvoice = (shipmentId: number) => {
  return useQuery({
    queryKey: ["shipments", shipmentId, "invoice"],
    queryFn: () => shipmentService.generatePdfInvoice(shipmentId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create shipment baru
export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShipment) => shipmentService.createShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      toast.success("Pengiriman berhasil dibuat!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal membuat pengiriman. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};
