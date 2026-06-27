import { Page } from "@/components/ui/page";
import { DataTable } from "./components/datatable";
import { useColumns } from "./components/datatable/columns";
import { Button } from "@/components/ui/button";
import { AddSquare } from "iconsax-reactjs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useShipments } from "@/hooks/use-shipment";
import { PermissionGuard } from "@/components/permission-guard";

export default function SendPackagePage() {
  // Use custom meta hook
  useMeta(META_DATA["send-package"]);
  const columns = useColumns();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: shipments = [], isLoading, error } = useShipments();

  // Filter shipments based on search query
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.trackingNumber
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipment.shipmentDetail?.packageType
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipment.pickupAddress?.address
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipment.shipmentDetail?.destinationAddress
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipment.shipmentDetail?.recipientName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  if (error) {
    return (
      <PermissionGuard permission="shipments.read">
        <Page title="Kirim Paket 🚚 🏠">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-600">
              Gagal memuat data pengiriman: {error.message}
            </p>
          </div>
        </Page>
      </PermissionGuard>
    );
  }

  return (
    <PermissionGuard permission="shipments.read">
      <Page
        title="Kirim Paket 🚚 🏠"
        action={
          <PermissionGuard permission="shipments.create">
            <Link to="/send-package/add">
              <Button variant="darkGreen">
                Buat Pengiriman Baru
                <AddSquare className="ml-auto" variant="Bold" size="20" />
              </Button>
            </Link>
          </PermissionGuard>
        }
      >
        <Input
          type="text"
          placeholder="Cari Pengiriman"
          className="mb-4 w-full max-w-sm bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <DataTable
            data={filteredShipments}
            columns={columns}
            title="Pengiriman Sebelumnya"
          />
        )}
      </Page>
    </PermissionGuard>
  );
}
