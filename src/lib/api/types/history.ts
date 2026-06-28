import type { ApiMeta, Pagination } from "./index";
import type { Shipment } from "./shipment";

export interface History {
  id: number;
  createdAt: string;
  trackingNumber: string;
  packageType: string;
  status: string;
}

export interface HistoryParams {
  trackingNumber?: string;
  page?: number;
  limit?: number;
}

export interface HistoryResponse {
  meta: ApiMeta;
  data: History[];
  paging: Pagination;
}

export interface SingleHistoryResponse {
  meta: ApiMeta;
  data: Shipment;
}
