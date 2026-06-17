import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  GetAllShipmentHistoriesParams,
  GetAllShipmentHistoriesResponse,
  GetOneShipmentHistoryResponse,
} from "@/lib/api/types/history";

export const getAllShipmentHistories = async (
  params?: GetAllShipmentHistoriesParams,
): Promise<GetAllShipmentHistoriesResponse> => {
  try {
    const { data } = await apiClient.get<GetAllShipmentHistoriesResponse>(
      "/api/shipments/histories",
      { params },
    );
    return data;
  } catch (error) {
    throw handleAxiosError(error as AxiosErrorType);
  }
};

export const getOneShipmentHistory = async (
  shipmentId: number,
): Promise<GetOneShipmentHistoryResponse> => {
  try {
    const { data } = await apiClient.get<GetOneShipmentHistoryResponse>(
      `/api/shipments/histories/${shipmentId}`,
    );
    return data;
  } catch (error) {
    throw handleAxiosError(error as AxiosErrorType);
  }
};
