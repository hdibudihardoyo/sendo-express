import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  CreateShipment,
  GetAllShipmentsParams,
  GetAllShipmentsResponse,
  GetOneShipmentResponse,
  CreateShipmentResponse,
  TrackingShipmentRequest,
  TrackShipmentResponse,
  Shipment,
} from "@/lib/api/types/shipment";

export const shipmentService = {
  // create shipment
  async createShipment(data: CreateShipment): Promise<Shipment> {
    try {
      const response = await apiClient.post<CreateShipmentResponse>(
        "/api/shipments",
        data,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // get all shipments
  async getAllShipments(params?: GetAllShipmentsParams): Promise<Shipment[]> {
    try {
      const response = await apiClient.get<GetAllShipmentsResponse>(
        "/api/shipments",
        {
          params,
        },
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  // get shipment by ID
  async getByIdShipment(shipmentId: number): Promise<Shipment> {
    try {
      const response = await apiClient.get<GetOneShipmentResponse>(
        `/api/shipments/${shipmentId}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async trackShipment(data: TrackingShipmentRequest): Promise<Shipment> {
    try {
      const response = await apiClient.post<TrackShipmentResponse>(
        "/api/shipments/trackings",
        data,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async generatePdfInvoice(shipmentId: number): Promise<Blob> {
    try {
      const response = await apiClient.get(`/api/shipments/${shipmentId}/pdf`, {
        responseType: "blob",
      });
      return response.data as Blob;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
