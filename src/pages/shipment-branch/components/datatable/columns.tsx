"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ShipmentBranch } from "@/lib/api/types/shipment-branch";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

const getTypeVariant = (type: "IN" | "OUT") => {
  return type === "IN" ? "darkGreen" : "warning";
};

export const columns: ColumnDef<ShipmentBranch>[] = [
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Tracking Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const trackingNumber = row.getValue("trackingNumber") as string;
      return (
        <div className="font-mono text-sm font-medium">{trackingNumber}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as "IN" | "OUT";
      return (
        <Badge variant={getTypeVariant(type)} className="font-semibold">
          {type}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm">
          {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "scannedByUserId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.getValue("scannedByUserId") as number;
      return <div className="text-sm font-medium">User {userId}</div>;
    },
  },
];
