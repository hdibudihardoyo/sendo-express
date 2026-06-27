import { Timer, TruckTime, BoxTick, Location } from "iconsax-reactjs";
import type { DeliveryStatus } from "@/lib/api/types/shipment";
import type { ReactNode } from "react";

type BadgeVariant =
  | "secondary"
  | "warning"
  | "default"
  | "destructive"
  | "darkGreen"
  | "outline";

type StatusConfig = {
  label: string;
  badge: BadgeVariant;
  icon: ReactNode;
};

const DEFAULT_STATUS: StatusConfig = {
  label: "-",
  badge: "secondary",
  icon: <Timer size={20} variant="Bold" />,
};

const STATUS_CONFIG: Partial<
  Record<NonNullable<DeliveryStatus>, StatusConfig>
> = {
  READY_TO_PICKUP: {
    label: "Siap Dijemput",
    badge: "secondary",
    icon: <Timer size={20} variant="Bold" />,
  },

  WAITING_FOR_PICKUP: {
    label: "Menunggu Dijemput",
    badge: "secondary",
    icon: <Timer size={20} variant="Bold" />,
  },

  PICKED_UP: {
    label: "Sudah Dijemput",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  IN_TRANSIT: {
    label: "Dalam Perjalanan",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  ARRIVED_AT_BRANCH: {
    label: "Tiba di Cabang",
    badge: "warning",
    icon: <Location size={20} variant="Bold" />,
  },

  DEPARTED_FROM_BRANCH: {
    label: "Berangkat dari Cabang",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  AT_BRANCH: {
    label: "Di Cabang",
    badge: "warning",
    icon: <Location size={20} variant="Bold" />,
  },

  ON_THE_WAY: {
    label: "Menuju Cabang Tujuan",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  READY_TO_PICKUP_AT_BRANCH: {
    label: "Siap Dijemput di Cabang",
    badge: "warning",
    icon: <Location size={20} variant="Bold" />,
  },

  READY_TO_DELIVER: {
    label: "Siap Dikirim",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  ON_THE_WAY_TO_ADDRESS: {
    label: "Menuju Alamat Tujuan",
    badge: "warning",
    icon: <TruckTime size={20} variant="Bold" />,
  },

  DELIVERED: {
    label: "Diterima",
    badge: "darkGreen",
    icon: <BoxTick size={20} variant="Bold" />,
  },

  COMPLETED: {
    label: "Selesai",
    badge: "darkGreen",
    icon: <BoxTick size={20} variant="Bold" />,
  },
};

export const getStatusLabel = (status: DeliveryStatus): string =>
  status ? (STATUS_CONFIG[status]?.label ?? status) : DEFAULT_STATUS.label;

export const getStatusIcon = (status: DeliveryStatus) =>
  status
    ? (STATUS_CONFIG[status]?.icon ?? DEFAULT_STATUS.icon)
    : DEFAULT_STATUS.icon;

export const getStatusBadgeVariant = (status: DeliveryStatus): BadgeVariant =>
  status
    ? (STATUS_CONFIG[status]?.badge ?? DEFAULT_STATUS.badge)
    : DEFAULT_STATUS.badge;
