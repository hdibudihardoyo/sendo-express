import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shipmentService } from "@/lib/api/services/shipment";
import type {
  CreateShipment,
  GetAllShipments,
  TrackingShipment,
} from "@/lib/api/types/shipment";

// Query keys
export const shipmentKeys = {
  all: ["shipments"] as const,
  lists: () => [...shipmentKeys.all, "list"] as const,
  list: (params?: GetAllShipments) =>
    [...shipmentKeys.lists(), params] as const,
  details: () => [...shipmentKeys.all, "detail"] as const,
  detail: (id: number) => [...shipmentKeys.details(), id] as const,
  tracking: (trackingNumber: string) =>
    [...shipmentKeys.all, "tracking", trackingNumber] as const,
  invoice: (id: number) => [...shipmentKeys.all, "invoice", id] as const,
};

// Get all shipments dengan optional params (trackingNumber, page, limit)
export const useGetAllShipments = (params?: GetAllShipments) => {
  return useQuery({
    queryKey: shipmentKeys.list(params),
    queryFn: () => shipmentService.getAllShipments(params),
  });
};

// Get one shipment by ID
export const useGetOneShipment = (shipmentId: number, enabled = true) => {
  return useQuery({
    queryKey: shipmentKeys.detail(shipmentId),
    queryFn: () => shipmentService.getOneShipment(shipmentId),
    enabled: !!shipmentId && enabled,
  });
};

// useTrackShipment untuk tracking shipment berdasarkan nomor resi (trackingNumber)
export const useTrackShipment = (trackingNumber: string, enabled = true) => {
  return useQuery({
    queryKey: shipmentKeys.tracking(trackingNumber),
    queryFn: () => shipmentService.trackShipment({ trackingNumber }),
    enabled: !!trackingNumber && enabled,
  });
};

// Generated PDF Invoice 
export const useGeneratePdfInvoice = (shipmentId: number, enabled = true) => {
  return useQuery({
    queryKey: shipmentKeys.invoice(shipmentId),
    queryFn: () => shipmentService.generatePdfInvoice(shipmentId),
    enabled: !!shipmentId && enabled,
  });
};

// CreateShipment mutation
export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateShipment) =>
      shipmentService.createShipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentKeys.lists() });
    },
  });
};

// TrackingShipment mutation untuk scan resi (update status siap jemput)
export const useTrackShipmentMutation = () => {
  return useMutation({
    mutationFn: (payload: TrackingShipment) =>
      shipmentService.trackShipment(payload),
  });
};
