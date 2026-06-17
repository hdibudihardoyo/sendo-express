import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shipmentBranchService } from "@/lib/api/services/shipment-branches";
import type {
  GetAllShipmentBranchesParams,
  ScanShipmentRequest,
} from "@/lib/api/types/shipment-branch";

export const shipmentBranchKeys = {
  all: ["shipment-branches"] as const,
  lists: () => [...shipmentBranchKeys.all, "list"] as const,
  list: (params?: GetAllShipmentBranchesParams) =>
    [...shipmentBranchKeys.lists(), params] as const,
  summary: () => [...shipmentBranchKeys.all, "summary"] as const,
};

export const useGetAllShipmentBranches = (
  params?: GetAllShipmentBranchesParams,
) => {
  return useQuery({
    queryKey: shipmentBranchKeys.list(params),
    queryFn: () => shipmentBranchService.getAllShipmentBranches(params),
  });
};

export const useGetShipmentBranchSummary = () => {
  return useQuery({
    queryKey: shipmentBranchKeys.summary(),
    queryFn: () => shipmentBranchService.getShipmentBranchSummary(),
  });
};

export const useScanShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ScanShipmentRequest) =>
      shipmentBranchService.scanShipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentBranchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: shipmentBranchKeys.summary() });
    },
  });
};
