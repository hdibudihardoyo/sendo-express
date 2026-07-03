"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import type { Shipment } from "@/lib/api/types/shipment";
import {
  getStatusBadgeVariant,
  getStatusLabel,
} from "@/lib/utils/status-utils";

export const deliveryColumns = (
  onViewDetail: (shipment: Shipment) => void,
): ColumnDef<Shipment>[] => [
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <span>No Resi</span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium">
          {row.getValue("trackingNumber") || "N/A"}
        </div>
      );
    },
  },
  {
    id: "packageType",
    header: "Produk",
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {row.original.shipmentDetail?.packageType || "N/A"}
        </div>
      );
    },
  },
  {
    id: "pickupAddr",
    header: "Alamat Pickup",
    cell: ({ row }) => {
      return (
        <div className="text-sm max-w-xs truncate">
          {row.original.pickupAddress?.address || "N/A"}
        </div>
      );
    },
  },
  {
    id: "destinationAddr",
    header: "Alamat Tujuan",
    cell: ({ row }) => {
      return (
        <div className="text-sm max-w-xs truncate">
          {row.original.shipmentDetail?.destinationAddress || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pickup",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | undefined;
      return (
        <div className="text-sm">
          {createdAt ? new Date(createdAt).toLocaleDateString("id-ID") : "N/A"}
        </div>
      );
    },
  },
  {
    id: "weight",
    header: "Berat (kg)",
    cell: ({ row }) => {
      const weight = row.original.shipmentDetail?.weight;
      return <div className="text-sm">{weight ? `${weight} kg` : "N/A"}</div>;
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;
      return (
        <Badge variant={getStatusBadgeVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    id: "deliveryType",
    header: "Tipe Pengiriman",
    cell: ({ row }) => {
      const deliveryType = row.original.shipmentDetail?.deliveryType;
      return (
        <div className="text-sm capitalize">
          {deliveryType ? deliveryType.replace(/_/g, " ") : "Reguler"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetail(shipment)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Detail
        </Button>
      );
    },
  },
];
