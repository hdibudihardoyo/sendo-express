"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Shipment, PaymentStatus } from "@/lib/api/types/shipment";
import {
  getStatusLabel,
  getStatusBadgeVariant,
} from "@/lib/utils/status-utils";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "./action-cell";

const getPaymentVariant = (
  status: PaymentStatus,
):
  | "secondary"
  | "warning"
  | "default"
  | "destructive"
  | "darkGreen"
  | "outline" => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "PAID":
    case "SETTLED":
      return "darkGreen";
    case "EXPIRED":
    case "FAILED":
      return "destructive";
    case "REFUNDED":
      return "secondary";
    default:
      return "secondary";
  }
};

const formatPaymentStatus = (status: PaymentStatus): string => {
  switch (status) {
    case "PENDING":
      return "Belum Bayar";
    case "PAID":
      return "Sudah Bayar";
    case "SETTLED":
      return "Lunas";
    case "EXPIRED":
      return "Kedaluwarsa";
    case "FAILED":
      return "Gagal Bayar";
    case "REFUNDED":
      return "Dikembalikan";
    default:
      return status;
  }
};

export const useColumns = (): ColumnDef<Shipment>[] => {
  const columns: ColumnDef<Shipment>[] = [
    {
      accessorKey: "trackingNumber",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        const isAsc = isSorted === "asc";
        const isDesc = isSorted === "desc";
        const handleSort = () => {
          if (!isSorted) {
            // Not sorted → sort ascending
            column.toggleSorting(false);
          } else if (isAsc) {
            // Currently ascending → sort descending
            column.toggleSorting(true);
          } else {
            // Currently descending → clear sorting
            column.clearSorting();
          }
        };
        return (
          <div className="flex items-center justify-between">
            <span>No Resi</span>
            <Button
              variant="ghost"
              onClick={handleSort}
              className="flex items-center gap-2"
            >
              <ArrowUpDown
                className="h-4 w-4"
                color={isAsc ? "#4CAF50" : isDesc ? "#F44336" : "#000"}
              />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const trackingNumber = row.getValue("trackingNumber") as string | null;
        return (
          <div className="text-sm font-medium">{trackingNumber ?? "-"}</div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Dibuat",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string);
        return (
          <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>
        );
      },
    },
    {
      accessorKey: "deliveryStatus",
      header: "Status Pengiriman",
      cell: ({ row }) => {
        const status = row.original.deliveryStatus;
        return (
          status && (
            <Badge variant={getStatusBadgeVariant(status)}>
              {getStatusLabel(status)}
            </Badge>
          )
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Status Pembayaran",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as PaymentStatus;
        return (
          <Badge variant={getPaymentVariant(status)}>
            {formatPaymentStatus(status)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => <ActionCell shipment={row.original} />,
    },
  ];

  return columns;
};
