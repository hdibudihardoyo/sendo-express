import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  CourierShipment,
  CourierShipmentActionResult,
  GetAllCourierShipmentsParams,
  GetAllCourierShipmentsResponse,
  GetOneCourierShipmentResponse,
  CourierShipmentActionResponse,
  PickUpShipmentRequest,
  DeliverToCustomerRequest,
  CourierShipmentListItem,
} from "@/lib/api/types/delivery";

export const courierShipmentService = {
  async getAllCourierShipments(
    params?: GetAllCourierShipmentsParams,
  ): Promise<CourierShipmentListItem[]> {
    try {
      const response = await apiClient.get<GetAllCourierShipmentsResponse>(
        "/api/shipments/courier",
        { params },
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async getOneCourierShipment(
    trackingNumber: string,
  ): Promise<CourierShipment> {
    try {
      const response = await apiClient.get<GetOneCourierShipmentResponse>(
        `/api/shipments/courier/${trackingNumber}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async pickShipment(
    trackingNumber: string,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/pick/${trackingNumber}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async pickUpShipment(
    trackingNumber: string,
    data: PickUpShipmentRequest,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/${trackingNumber}/pick-up`,
        data,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async deliverToBranch(
    trackingNumber: string,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/deliver-branches/${trackingNumber}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async pickFromBranch(
    trackingNumber: string,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/pick-from-branches/${trackingNumber}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async pickUpFromBranch(
    trackingNumber: string,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/pickup-from-branch/${trackingNumber}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async deliverToCustomer(
    trackingNumber: string,
    data: DeliverToCustomerRequest,
  ): Promise<CourierShipmentActionResult> {
    try {
      const response = await apiClient.patch<CourierShipmentActionResponse>(
        `/api/shipments/courier/deliver-to-customer/${trackingNumber}`,
        data,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
