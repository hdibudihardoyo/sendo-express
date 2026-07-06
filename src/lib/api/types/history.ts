import type { ApiMeta, Pagination } from "./index";
import type { DeliveryStatus } from "./shipment";

export interface History {
  id: number;
  createdAt: string;
  trackingNumber: string;
  packageType: string;
  status: DeliveryStatus;
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

export interface HistoryInfo {
  senderAddress: string;
  senderName: string;
  senderPhone: string;
  recipientAddress: string;
  recipientName: string;
  recipientPhone: string;
}

export interface TimelineEntry {
  id: number;
  createdAt: string;
  status: DeliveryStatus;
  description: string;
}

export interface HistoryDetail extends History {
  deliveryType: string;
  shipmentInfo: HistoryInfo;
  shipmentHistories: TimelineEntry[];
}

export interface SingleHistoryResponse {
  meta: ApiMeta;
  data: HistoryDetail;
}
