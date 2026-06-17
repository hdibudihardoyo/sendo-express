import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  CreateShipment,
  CreateShipmentResponse,
  GeneratePdfInvoiceResponse,
  GetAllShipments,
  GetAllShipmentsResponse,
  GetOneShipmentResponse,
  TrackingShipment,
  TrackShipmentResponse,
} from "@/lib/api/types/shipment";

export const shipmentService = {
  async createShipment(
    payload: CreateShipment,
  ): Promise<CreateShipmentResponse> {
    try {
      const response = await apiClient.post<CreateShipmentResponse>(
        "/api/shipments",
        payload,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async getAllShipments(
    params?: GetAllShipments,
  ): Promise<GetAllShipmentsResponse> {
    try {
      const response = await apiClient.get<GetAllShipmentsResponse>(
        "/api/shipments",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async getOneShipment(shipmentId: number): Promise<GetOneShipmentResponse> {
    try {
      const response = await apiClient.get<GetOneShipmentResponse>(
        `/api/shipments/${shipmentId}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async trackShipment(
    payload: TrackingShipment,
  ): Promise<TrackShipmentResponse> {
    try {
      const response = await apiClient.post<TrackShipmentResponse>(
        "/api/shipments/trackings",
        payload,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async generatePdfInvoice(
    shipmentId: number,
  ): Promise<GeneratePdfInvoiceResponse> {
    try {
      const response = await apiClient.get<GeneratePdfInvoiceResponse>(
        `/api/shipments/${shipmentId}/pdf`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
