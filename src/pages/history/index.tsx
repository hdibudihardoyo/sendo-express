import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { DataTable } from "./components/datatable";
import { columns } from "./components/datatable/columns";
import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useGetAllShipmentHistories } from "@/hooks/use-history";

export default function HistoryPage() {
  useMeta(META_DATA.history);

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useGetAllShipmentHistories();

  const shipments = data?.data ?? [];

  const filteredShipments = useMemo(() => {
    if (!searchQuery.trim()) return shipments;
    const q = searchQuery.toLowerCase();
    return shipments.filter(
      (shipment) =>
        shipment.trackingNumber?.toLowerCase().includes(q) ||
        shipment.packageType?.toLowerCase().includes(q) ||
        shipment.status?.toLowerCase().includes(q),
    );
  }, [searchQuery, shipments]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Page title="Riwayat Pengiriman 📜⏰">
        <Input
          type="text"
          placeholder="Cari Pengiriman"
          className="mb-4 w-full max-w-sm bg-white"
          value={searchQuery}
          onChange={handleSearch}
        />

        {isError && (
          <p className="mb-4 text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Gagal memuat riwayat pengiriman"}
          </p>
        )}

        <DataTable
          data={filteredShipments}
          columns={columns}
          title="Paket yang Sudah Dikirim"
          isLoading={isLoading}
        />

        <Toaster position="top-right" />
      </Page>
    </>
  );
}
