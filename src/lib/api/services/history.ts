import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  HistoryParams,
  HistoryResponse,
  SingleHistoryResponse,
} from "@/lib/api/types/history";

export const getAllHistory = async (
  params?: HistoryParams,
): Promise<HistoryResponse> => {
  try {
    const { data } = await apiClient.get<HistoryResponse>(
      "/api/shipments/histories",
      { params },
    );
    return data;
  } catch (error) {
    throw handleAxiosError(error as AxiosErrorType);
  }
};

export const getByIdHistory = async (
  shipmentId: number,
): Promise<SingleHistoryResponse> => {
  try {
    const { data } = await apiClient.get<SingleHistoryResponse>(
      `/api/shipments/histories/${shipmentId}`,
    );
    return data;
  } catch (error) {
    throw handleAxiosError(error as AxiosErrorType);
  }
};
