import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { courierColumns } from "./components/datatable/courier-columns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useCourierShipments } from "@/hooks/use-delivery";
import { PermissionGuard } from "@/components/permission-guard";
import { Button } from "@/components/ui/button";

export default function DeliveryPage() {
  useMeta(META_DATA.delivery);

  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: shipments = [],
    error,
    refetch,
  } = useCourierShipments({ trackingNumber: searchTerm || undefined });

  const handleRefresh = () => {
    refetch();
    toast.success("Data pengiriman berhasil diperbarui.");
  };

  if (error) {
    return (
      <Page title="Daftar Pengiriman 🚚📦">
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">Error: {error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            Coba lagi
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <PermissionGuard permission="delivery.read">
      <Page title="Daftar Pengiriman 🚚📦">
        <div className="mb-4 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Cari berdasarkan nomor resi atau alamat tujuan"
            className="w-full max-w-md bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DataTable
          data={shipments}
          columns={courierColumns(handleRefresh)}
          title="Semua Pengiriman"
        />
      </Page>
    </PermissionGuard>
  );
}
