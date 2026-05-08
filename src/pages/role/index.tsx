import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { createColumns } from "./components/datatable/columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRoles } from "@/hooks/use-role";
import { PermissionGuard, Skeleton } from "@/components";
import { useMeta, META_DATA } from "@/hooks/use-meta";

export default function RolePage() {
  // Use custom meta hook
  useMeta(META_DATA.role);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: roles, isLoading, error } = useRoles();
  console.log(roles);

  const filteredRoles =
    roles?.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.permissions.some(
          (permission) =>
            permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            permission.key.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    ) || [];

  const columns = createColumns();

  if (error) {
    return (
      <Page title="Kelola Role 🔐👨‍💼">
        <div className="py-8 text-center">
          <div className="text-red-500">
            <p>
              {error instanceof Error
                ? error.message
                : "Terjadi kesalahan saat memuat data role"}
            </p>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <>
      <PermissionGuard permission="permissions.manage">
        <Page title="Kelola Role 🔐👨‍💼">
          <Input
            type="text"
            placeholder="Cari Role Berdasarkan Nama Role"
            className="mb-4 w-full max-w-md bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          ) : (
            <DataTable
              data={filteredRoles}
              columns={columns}
              title="Daftar Role"
            />
          )}
        </Page>
      </PermissionGuard>
    </>
  );
}
