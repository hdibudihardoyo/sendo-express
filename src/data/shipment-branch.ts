import type { ShipmentBranch } from "@/lib/api/types/shipment-branch";

const dummyUsers = [
  { id: 101, fullName: "Admin Cabang Jakarta", email: "admin.jkt@sendo.com" },
  { id: 102, fullName: "Admin Cabang Bandung", email: "admin.bdg@sendo.com" },
];

export const shipmentBranchLogs: ShipmentBranch[] = [
  {
    id: 1,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "KJ2024001",
    type: "IN",
    status: "ARRIVED_AT_BRANCH",
    scanTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: "Paket diterima di cabang Jakarta",
    scannedByUserId: dummyUsers[0],
  },
  {
    id: 2,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "KJ2024001",
    type: "OUT",
    status: "OUT_FOR_DELIVERY",
    scanTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    description: "Paket dikirim keluar dari cabang Jakarta untuk diantar",
    scannedByUserId: dummyUsers[0],
  },
  {
    id: 3,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    trackingNumber: "KJ2024002",
    type: "IN",
    status: "ARRIVED_AT_BRANCH",
    scanTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    description: "Paket diterima di cabang Bandung",
    scannedByUserId: dummyUsers[1],
  },
];

export const mockShipmentBranchService = {
  getAll: async (): Promise<ShipmentBranch[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return shipmentBranchLogs;
  },

  getByTrackingNumber: async (
    trackingNumber: string,
  ): Promise<ShipmentBranch[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return shipmentBranchLogs.filter(
      (log) => log.trackingNumber === trackingNumber,
    );
  },

  scan: async (
    trackingNumber: string,
    type: "IN" | "OUT",
    isReadyToPickup?: boolean,
  ): Promise<ShipmentBranch> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newLog: ShipmentBranch = {
      id: Math.max(...shipmentBranchLogs.map((l) => l.id)) + 1,
      createdAt: new Date().toISOString(),
      trackingNumber,
      type,
      status: type === "IN" ? "ARRIVED_AT_BRANCH" : "OUT_FOR_DELIVERY",
      scanTime: new Date().toISOString(),
      description: isReadyToPickup
        ? `Paket ${trackingNumber} siap diambil kurir`
        : `Paket ${trackingNumber} di-scan ${type === "IN" ? "masuk" : "keluar"} cabang`,
      scannedByUserId: dummyUsers[0],
    };

    shipmentBranchLogs.push(newLog);
    return newLog;
  },
};
