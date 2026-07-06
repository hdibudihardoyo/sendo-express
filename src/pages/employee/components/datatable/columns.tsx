"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { EmployeeBranch } from "@/lib/api/types/employee";
import { ActionCell } from "./action-cell";

export const columns = (): ColumnDef<EmployeeBranch>[] => [
  {
    accessorKey: "user.fullName",
    header: "Nama Karyawan",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium">{row.original.user.fullName}</div>
      );
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.user.email}</div>;
    },
  },
  {
    accessorKey: "user.phoneNumber",
    header: "Nomor Telepon",
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.user.phoneNumber}</div>;
    },
  },
  {
    accessorKey: "user.role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.user.role;
      const roleLabel = role.key === "courier" ? "Kurir" : "Admin";
      const roleColor =
        role.key === "courier"
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800";

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColor}`}
        >
          {roleLabel}
        </span>
      );
    },
  },
  {
    accessorKey: "branch.name",
    header: "Cabang",
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.branch.name}</div>;
    },
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => {
      return <ActionCell employee={row.original} />;
    },
  },
];
