import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Box, I3DCubeScan, TruckTime } from "iconsax-reactjs";
import { useCourierShipment } from "@/hooks/use-delivery";
import {
  getStatusBadgeVariant,
  getStatusIcon,
  getStatusLabel,
} from "@/lib/utils/status-utils";

interface DetailProps {
  trackingNumber: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const Detail = ({ trackingNumber, isOpen, onClose }: DetailProps) => {
  const { data: shipment, isLoading } = useCourierShipment(
    trackingNumber ?? "",
  );

  const formatWeight = (grams: number) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)} kg`;
    }
    return `${grams} g`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Paket
          </DialogTitle>
        </DialogHeader>

        {isLoading && <p className="text-sm text-gray-500">Memuat detail...</p>}

        {!isLoading && shipment && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Informasi Paket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg text-white">
                    <I3DCubeScan size={16} variant="Bold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">No. Resi</p>
                    <p className="font-semibold">
                      {shipment.trackingNumber || "Belum tersedia"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-lg text-white">
                    <Box size={16} variant="Bold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Jenis Paket</p>
                    <p className="font-semibold capitalize">
                      {shipment.packageType || "Standar"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-2 rounded-lg text-white">
                    <Box size={16} variant="Bold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Berat</p>
                    <p className="font-semibold">
                      {formatWeight(shipment.weight || 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Box size={16} variant="Bold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Ongkir</p>
                    <p className="font-semibold">
                      {formatPrice(shipment.totalPrice || 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 p-2 rounded-lg text-white">
                    {getStatusIcon(shipment.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge
                      variant={getStatusBadgeVariant(shipment.status)}
                      className="mt-1"
                    >
                      {getStatusLabel(shipment.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Dari</p>
                    <p className="font-medium">
                      {shipment.senderName || "Pengirim"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <TruckTime size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ke</p>
                    <p className="font-medium">
                      {shipment.recipientName || "Penerima"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alamat Tujuan</p>
                  <p className="font-medium">
                    {shipment.destinationAddress || "Tidak tersedia"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
