import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shipmentService } from "@/lib/api/services/shipment";
import { toast } from "react-hot-toast";
import type {
  CreateShipment,
  GetAllShipmentsParams,
} from "@/lib/api/types/shipment";

export const shipmentKeys = {
  all: ["shipments"] as const,
  lists: () => [...shipmentKeys.all, "list"] as const,
  list: (filters?: GetAllShipmentsParams) =>
    [...shipmentKeys.lists(), filters] as const,
  details: () => [...shipmentKeys.all, "detail"] as const,
  detail: (shipmentId: number) =>
    [...shipmentKeys.details(), shipmentId] as const,
  tracking: (trackingNumber: string) =>
    [...shipmentKeys.all, "tracking", trackingNumber] as const,
  invoice: (shipmentId: number) =>
    [...shipmentKeys.detail(shipmentId), "invoice"] as const,
};

// Get all shipments dengan optional params (trackingNumber, page, limit)
export const useShipments = (filters?: GetAllShipmentsParams) => {
  return useQuery({
    queryKey: shipmentKeys.list(filters),
    queryFn: () => shipmentService.getAllShipments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get one shipment by ID
export const useShipmentById = (shipmentId: number) => {
  return useQuery({
    queryKey: shipmentKeys.detail(shipmentId),
    queryFn: () => shipmentService.getByIdShipment(shipmentId),
    enabled: !!shipmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Tracking shipment berdasarkan nomor resi (trackingNumber)
export const useTrackShipment = () => {
  return useMutation({
    mutationFn: (data: { trackingNumber: string }) =>
      shipmentService.trackShipment(data),
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal melacak pengiriman. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

// Generate PDF Invoice
export const useGeneratePdfInvoice = () => {
  return useMutation({
    mutationFn: (shipmentId: number) =>
      shipmentService.generatePdfInvoice(shipmentId),
    onSuccess: (blob, shipmentId) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${shipmentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF berhasil diunduh!");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal mengunduh PDF. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};

// Create shipment
export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShipment) => shipmentService.createShipment(data),
    onSuccess: () => {
      toast.success("Pengiriman berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: shipmentKeys.lists() });
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Gagal membuat pengiriman. Silakan coba lagi.";
      toast.error(errorMessage);
    },
  });
};
