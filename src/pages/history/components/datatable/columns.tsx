"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { ShipmentHistoryItem } from "@/lib/api/types/history";
import { HistoryActionCell } from "./history-action-cell";

const getVariantFromStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "picked_up":
    case "in_transit":
    case "on_the_way":
    case "departed_from_branch":
    case "ready_to_pickup":
      return "default";
    case "waiting_pickup":
    case "pending":
      return "secondary";
    case "arrived_at_branch":
    case "at_branch":
      return "outline";
    case "delivered":
    case "completed":
      return "darkGreen";
    case "failed":
      return "destructive";
    default:
      return "default";
  }
};

const formatStatus = (status: string) =>
  status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

export const columns: ColumnDef<ShipmentHistoryItem>[] = [
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const isAsc = isSorted === "asc";
      const isDesc = isSorted === "desc";

      const handleSort = () => {
        if (!isSorted) column.toggleSorting(false);
        else if (isAsc) column.toggleSorting(true);
        else column.clearSorting();
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
    cell: ({ row }) => (
      <div className="text-sm font-medium">
        {row.getValue("trackingNumber") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "packageType",
    header: "Jenis Paket",
    cell: ({ row }) => (
      <div className="text-sm capitalize">
        {(row.getValue("packageType") as string)?.toLowerCase() || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const raw = row.getValue("createdAt") as string | undefined;
      const date = raw ? new Date(raw).toLocaleDateString("id-ID") : "N/A";
      return <div className="text-sm">{date}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || "pending";
      return (
        <Badge variant={getVariantFromStatus(status)}>
          {formatStatus(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <HistoryActionCell shipment={row.original} />,
  },
];
