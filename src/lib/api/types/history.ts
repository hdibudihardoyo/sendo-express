import type { ApiMeta, Pagination } from "./index";

export interface ShipmentHistory {
  id: number;
  createdAt: string;
  trackingNumber: string;
  packageType: string;
  status: string;
}

export interface GetAllShipmentHistoriesParams {
  trackingNumber?: string;
  page?: number;
  limit?: number;
}

export interface GetAllShipmentHistoriesResponse {
  meta: ApiMeta;
  data: ShipmentHistory[];
  paging: Pagination;
}

export interface GetOneShipmentHistoryResponse {
  meta: ApiMeta;
  data: ShipmentHistory;
}
