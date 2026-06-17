import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  GetAllShipmentBranchesParams,
  ScanShipmentRequest,
  ScanShipmentResponse,
  ShipmentBranchResponse,
  ShipmentBranchSummaryResponse,
} from "../types/shipment-branch";

export const shipmentBranchService = {
  async scanShipment(
    payload: ScanShipmentRequest,
  ): Promise<ScanShipmentResponse> {
    try {
      const response = await apiClient.post<ScanShipmentResponse>(
        "/api/shipments/branches",
        payload,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async getAllShipmentBranches(
    params?: GetAllShipmentBranchesParams,
  ): Promise<ShipmentBranchResponse> {
    try {
      const response = await apiClient.get<ShipmentBranchResponse>(
        "/api/shipments/branches",
        { params },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // Summary Data Shipment Branch
  async getShipmentBranchSummary(): Promise<ShipmentBranchSummaryResponse> {
    try {
      const response = await apiClient.get<ShipmentBranchSummaryResponse>(
        "/api/shipments/branches/summary",
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
