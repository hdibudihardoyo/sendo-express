// Global API types and interfaces

export interface ApiMeta {
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  success?: boolean;
}

export interface ApiResponse<T> {
  meta: ApiMeta;
  data: T;
}

export interface Pagination {
  totalData: number;
  totalPages: number;
  currentPage: number;
  currentLimit: number;
}

// Re-export all types
export * from "./auth";
export * from "./branch";
export * from "./user-address";
export * from "./profile";
export * from "./employee";
export * from "./role";
export * from "./shipment-branch";
export * from "./webhooks";

// Re-export shipment types (excluding conflicting User type)
export type {
  ShipmentStatus,
  PaymentStatus,
  ShippingType,
  Shipment,
  CreateShipmentRequest,
  UpdateShipmentRequest,
  ShipmentResponse,
  ShipmentDetailResponse,
  PayShipmentRequest,
  PayShipmentResponse,
} from "./shipment";
