import type { ApiMeta, Pagination } from "./index";

export type CourierShipmentStatus =
  | "READY_TO_PICKUP"
  | "WAITING_FOR_PICKUP"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "READY_TO_DELIVER"
  | "ON_THE_WAY_TO_ADDRESS"
  | "DELIVERED";

export interface CourierShipmentListItem {
  id: number;
  trackingNumber: string;
  destinationAddress: string;
  status: CourierShipmentStatus;
}

export interface CourierShipment {
  id: number;
  trackingNumber: string;
  destinationAddress: string;
  status: CourierShipmentStatus;
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
  status: CourierShipmentStatus;
  packageType: string;
  weight: number;
  totalPrice: number;
  pickupProof: string | null;
  receiptProof?: string | null;
}

// REQUEST TYPES
export interface GetAllCourierShipmentsParams {
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

// RESPONSE TYPES
export interface GetAllCourierShipmentsResponse {
  meta: ApiMeta;
  data: CourierShipmentListItem[];
  paging: Pagination;
}

export interface GetOneCourierShipmentResponse {
  meta: ApiMeta;
  data: CourierShipment;
}

// Response untuk aksi status:
// Pick Shipment, Pick Up Shipment, Deliver To Branch, Pick From Branch, Pick Up From Branch, Deliver To Customer
export interface CourierShipmentActionResponse {
  meta: ApiMeta;
  data: CourierShipmentActionResult;
}
