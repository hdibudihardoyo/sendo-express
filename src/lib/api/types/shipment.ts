// type definitions for shipment-related API interactions
import type { ApiMeta, Pagination } from "./index";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "SETTLED"
  | "EXPIRED"
  | "FAILED"
  | "REFUNDED";

export type DeliveryStatus =
  | "READY_TO_PICKUP"
  | "PICKED_UP"
  | "ON_TRANSIT"
  | "ARRIVED_AT_BRANCH"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "FAILED_DELIVERY"
  | null;

export type DeliveryType = "regular" | "next_day" | "same_day" | string;

// NESTED TYPES
export interface ShipmentUser {
  id: number;
  fullName: string;
  email: string;
}

export interface ShipmentPayment {
  id: number;
  createdAt: string;
  paymentMethod: string | null;
  status: PaymentStatus;
  expiryDate: string;
  externalId: string;
  invoiceId: string;
  invoiceUrl: string;
}

export interface ShipmentDetail {
  id: number;
  createdAt: string;
  weight: number;
  deliveryType: DeliveryType;
  destinationAddress: string;
  packageType: string;
  pickupProof: string | null;
  receiptProof: string | null;
  destinationLatitude: number;
  destinationLongitude: number;
  recipientName: string;
  recipientPhone: string;
  senderName: string;
  senderPhone: string;
  basePrice: number;
  distancePrice: number;
  weightPrice: number;
  user: ShipmentUser;
}

export interface PickupAddress {
  id: number;
  address: string;
  tag: string;
  latitude: number;
  longitude: number;
  label: string;
  photo: string;
}

export interface ShipmentTimelineEntry {
  id: number;
  createdAt: string;
  status: string;
  description: string;
}

// MAIN ENTITY
export interface Shipment {
  id: number;
  createdAt: string;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  trackingNumber: string | null;
  price: number;
  distance: number;
  qrCodeImage: string | null;
  payment: ShipmentPayment;
  shipmentHistories: ShipmentTimelineEntry[];
  shipmentDetail: ShipmentDetail;
  pickupAddress: PickupAddress;
}

// REQUEST TYPES
export interface CreateShipment {
  deliveryType: string;
  destinationAddress: string;
  packageType: string;
  pickupAddressId: number;
  recipientName: string;
  recipientPhone: string;
  senderName: string;
  senderPhone: string;
  totalWeight: number;
}

export interface GetAllShipmentsParams {
  trackingNumber?: string;
  page?: number;
  limit?: number;
}

export interface TrackingShipmentRequest {
  trackingNumber: string;
}

// RESPONSE TYPES
export interface CreateShipmentResponse {
  meta: ApiMeta;
  data: Shipment;
}

export interface GetAllShipmentsResponse {
  meta: ApiMeta;
  data: Shipment[];
  paging: Pagination;
}

export interface GetOneShipmentResponse {
  meta: ApiMeta;
  data: Shipment;
}

export interface TrackShipmentResponse {
  meta: ApiMeta;
  data: Shipment;
}

export interface GeneratePdfInvoiceResponse {
  meta: ApiMeta;
  data: unknown;
}
