import type { ApiMeta, Pagination } from "./index";
import type { DeliveryStatus } from "./shipment";

export interface CourierShipmentListItem {
  id: number;
  trackingNumber: string;
  destinationAddress: string;
  status: DeliveryStatus;
}

export interface CourierShipment {
  id: number;
  trackingNumber: string;
  destinationAddress: string;
  status: DeliveryStatus;
  senderName: string;
  recipientName: string;
  packageType: string;
  weight: number;
  totalPrice: number;
  pickupProof: string | null;
  receiptProof: string | null;
}

export interface CourierShipmentActionResult {
  id: number;
  trackingNumber: string;
  destinationAddress: string;
  status: DeliveryStatus;
  packageType: string;
  weight: number;
  totalPrice: number;
  pickupProof: string | null;
}

// REQUEST TYPES
export interface CourierShipmentParams {
  trackingNumber?: string;
  page?: number;
  limit?: number;
}

export interface PickUpShipmentRequest {
  pickupProofImageUrl: string;
}

export interface DeliverToCustomerRequest {
  receiptProofImageUrl: string;
}

export interface GetAllCourierShipmentsResponse {
  meta: ApiMeta;
  data: CourierShipmentListItem[];
  paging: Pagination;
}

export interface GetOneCourierShipmentResponse {
  meta: ApiMeta;
  data: CourierShipment;
}

// Pick Shipment, Pick Up Shipment, Deliver To Branch, Pick From Branch, Pick Up From Branch
export interface CourierShipmentActionResponse {
  meta: ApiMeta;
  data: CourierShipmentActionResult;
}

// Deliver To Customer
export interface DeliverToCustomerResponse {
  meta: ApiMeta;
  data: CourierShipmentActionResult & {
    receiptProof?: string | null;
  };
}
