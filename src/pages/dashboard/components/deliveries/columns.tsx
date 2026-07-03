"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { History } from "@/lib/api/types/history";
import {
  getStatusBadgeVariant,
  getStatusLabel,
} from "@/lib/utils/status-utils";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { useNavigate } from "react-router";

function DetailButton({ historyId }: { historyId: number }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate(`/history/detail/${historyId}`)}
    >
      <Eye className="mr-2 h-4 w-4" />
      Detail
    </Button>
  );
}

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <span>No Resi</span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium">
          {row.getValue("trackingNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "packageType",
    header: "Produk",
    cell: ({ row }) => {
      return (
        <div className="text-sm capitalize">{row.getValue("packageType")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm">
          {new Date(createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={getStatusBadgeVariant(status)} className="rounded-xl">
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return <DetailButton historyId={row.original.id} />;
    },
  },
];
