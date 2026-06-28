import { useQuery } from "@tanstack/react-query";
import { getAllHistory, getByIdHistory } from "@/lib/api/services/history";
import type { HistoryParams } from "@/lib/api/types/history";

// QUERY KEYS
export const historyKeys = {
  all: ["history"] as const,
  lists: () => [...historyKeys.all, "list"] as const,
  list: (params?: HistoryParams) => [...historyKeys.lists(), params] as const,
  details: () => [...historyKeys.all, "detail"] as const,
  detail: (shipmentId: number) =>
    [...historyKeys.details(), shipmentId] as const,
};

export const useGetAllHistory = (params?: HistoryParams) => {
  return useQuery({
    queryKey: historyKeys.list(params),
    queryFn: () => getAllHistory(params),
  });
};

export const useHistoryById = (shipmentId: number) => {
  return useQuery({
    queryKey: historyKeys.detail(shipmentId),
    queryFn: () => getByIdHistory(shipmentId),
    enabled: !!shipmentId,
    staleTime: 5 * 60 * 1000,
  });
};
