import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { useState, useMemo, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useGetAllHistory } from "@/hooks/use-history";
import { PermissionGuard } from "@/components/permission-guard";

export default function HistoryPage() {
  useMeta(META_DATA.history);

  const [searchQuery, setSearchQuery] = useState("");
  const { data, isError, error } = useGetAllHistory();

  const filteredShipments = useMemo(() => {
    const shipments = data?.data ?? [];
    if (!searchQuery.trim()) return shipments;
    const q = searchQuery.toLowerCase();
    return shipments.filter(
      (shipment) =>
        shipment.trackingNumber?.toLowerCase().includes(q) ||
        shipment.packageType?.toLowerCase().includes(q) ||
        shipment.status?.toLowerCase().includes(q),
    );
  }, [searchQuery, data?.data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Gagal memuat riwayat pengiriman");
    }
  }, [isError, error]);

  return (
    <PermissionGuard permission="history.read">
      <Page title="Riwayat Pengiriman 📜⏰">
        <Input
          type="text"
          placeholder="Cari Pengiriman"
          className="mb-4 w-full max-w-sm bg-white"
          value={searchQuery}
          onChange={handleSearch}
        />
        <DataTable
          data={filteredShipments}
          columns={columns}
          title="Paket yang Sudah Dikirim"
        />
        <Toaster position="top-right" />
      </Page>
    </PermissionGuard>
  );
}
