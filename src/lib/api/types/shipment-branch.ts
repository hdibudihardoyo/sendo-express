import type { ApiMeta, Pagination } from "./index";
import type { DeliveryStatus } from "./shipment";

export interface ScanShipmentRequest {
  trackingNumber: string;
  type: "IN" | "OUT";
  isReadyToPickup?: boolean;
}

export interface ShipmentBranchParams {
  trackingNumber?: string;
  page?: number;
  limit?: number;
}

export interface ScannedByUser {
  id: number;
  fullName: string;
  email: string;
}

export interface ShipmentBranch {
  id: number;
  createdAt: string;
  trackingNumber: string;
  type: "IN" | "OUT";
  status: DeliveryStatus;
  scanTime: string;
  description: string;
  ScannedByUser: ScannedByUser;
}

export interface ShipmentBranchSummaryData {
  packagesInToday: number;
  packagesOutToday: number;
  totalActivity: number;
}

export interface ScanShipmentResponse {
  meta: ApiMeta;
  data: ShipmentBranch;
}

export interface ShipmentBranchResponse {
  meta: ApiMeta;
  data: ShipmentBranch[];
  paging: Pagination;
}

export interface ShipmentBranchSummaryResponse {
  meta: ApiMeta;
  data: ShipmentBranchSummaryData;
}
