import { useQuery } from "@tanstack/react-query";
import {
  getAllShipmentHistories,
  getOneShipmentHistory,
} from "@/lib/api/services/history";
import type { GetAllShipmentHistoriesParams } from "@/lib/api/types/history";

// ─────────────────────────────────────────────
// QUERY KEYS
// ─────────────────────────────────────────────
export const shipmentHistoryKeys = {
  all: ["shipment-histories"] as const,
  lists: () => [...shipmentHistoryKeys.all, "list"] as const,
  list: (params?: GetAllShipmentHistoriesParams) =>
    [...shipmentHistoryKeys.lists(), params] as const,
  details: () => [...shipmentHistoryKeys.all, "detail"] as const,
  detail: (shipmentId: number) =>
    [...shipmentHistoryKeys.details(), shipmentId] as const,
};

export const useGetAllShipmentHistories = (
  params?: GetAllShipmentHistoriesParams,
) => {
  return useQuery({
    queryKey: shipmentHistoryKeys.list(params),
    queryFn: () => getAllShipmentHistories(params),
  });
};

export const useGetOneShipmentHistory = (
  shipmentId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: shipmentHistoryKeys.detail(shipmentId),
    queryFn: () => getOneShipmentHistory(shipmentId),
    enabled: !!shipmentId && enabled,
  });
};
