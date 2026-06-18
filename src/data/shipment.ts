import type { Shipment } from "@/lib/api/types/shipment";

export const mockShipments: Shipment[] = [
  {
    id: 1,
    createdAt: "2024-06-01T08:30:00Z",
    paymentStatus: "PAID",
    deliveryStatus: "DELIVERED",
    trackingNumber: "KA240601001",
    price: 25000,
    distance: 5.2,
    qrCodeImage: "/images/qr/qr-001.png",
    payment: {
      id: 1,
      createdAt: "2024-06-01T08:30:00Z",
      paymentMethod: "DANA",
      status: "PAID",
      expiryDate: "2024-06-01T23:59:59Z",
      externalId: "EXT001",
      invoiceId: "INV001",
      invoiceUrl: "https://checkout.xendit.co/web/659bc",
    },
    shipmentHistories: [
      {
        id: 1,
        createdAt: "2024-06-01T08:30:00Z",
        status: "PENDING",
        description: "Shipment created with total price 25000 cents",
      },
      {
        id: 2,
        createdAt: "2024-06-01T14:30:00Z",
        status: "DELIVERED",
        description: "Shipment delivered successfully to recipient",
      },
    ],
    shipmentDetail: {
      id: 1,
      createdAt: "2024-06-01T08:30:00Z",
      weight: 2500,
      deliveryType: "regular",
      destinationAddress: "Jl. Sudirman No. 25, Jakarta Pusat",
      packageType: "Dokumen",
      pickupProof: "/images/proof/pickup-001.jpg",
      receiptProof: "/images/proof/receipt-001.jpg",
      destinationLatitude: -6.2088,
      destinationLongitude: 106.8456,
      recipientName: "Ahmad Rizki",
      recipientPhone: "081234567890",
      senderName: "John Doe",
      senderPhone: "081234567890",
      basePrice: 15000,
      distancePrice: 5000,
      weightPrice: 5000,
      user: {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
      },
    },
    pickupAddress: {
      id: 1,
      address:
        "Jl. Pahlawan No. 10, RT 002/RW 003, Kelurahan Kebayoran Baru, Jakarta Selatan",
      tag: "Rumah berwarna putih dengan pagar hitam, dekat warung sate",
      label: "Rumah",
      photo: "/images/addresses/home-1.jpg",
      latitude: -6.225014,
      longitude: 106.801529,
    },
  },
  {
    id: 2,
    createdAt: "2024-06-02T10:15:00Z",
    paymentStatus: "PAID",
    deliveryStatus: "ON_TRANSIT",
    trackingNumber: "KA240602002",
    price: 45000,
    distance: 12.8,
    qrCodeImage: "/images/qr/qr-002.png",
    payment: {
      id: 2,
      createdAt: "2024-06-02T10:15:00Z",
      paymentMethod: "OVO",
      status: "PAID",
      expiryDate: "2024-06-02T23:59:59Z",
      externalId: "EXT002",
      invoiceId: "INV002",
      invoiceUrl: "https://checkout.xendit.co/web/659bd",
    },
    shipmentHistories: [
      {
        id: 3,
        createdAt: "2024-06-02T10:15:00Z",
        status: "PENDING",
        description: "Shipment created with total price 45000 cents",
      },
      {
        id: 4,
        createdAt: "2024-06-02T15:20:00Z",
        status: "ON_TRANSIT",
        description: "Shipment is on transit to destination branch",
      },
    ],
    shipmentDetail: {
      id: 2,
      createdAt: "2024-06-02T10:15:00Z",
      weight: 5000,
      deliveryType: "same_day",
      destinationAddress: "Jl. Gatot Subroto No. 100, Jakarta Selatan",
      packageType: "Elektronik",
      pickupProof: "/images/proof/pickup-002.jpg",
      receiptProof: null,
      destinationLatitude: -6.2297,
      destinationLongitude: 106.8261,
      recipientName: "Siti Nurhaliza",
      recipientPhone: "081987654321",
      senderName: "Jane Smith",
      senderPhone: "081987654321",
      basePrice: 20000,
      distancePrice: 10000,
      weightPrice: 15000,
      user: {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
      },
    },
    pickupAddress: {
      id: 2,
      address: "Jl. Merdeka No. 45, RT 001/RW 002, Menteng, Jakarta Pusat",
      tag: "Gedung tinggi warna cream, lobby di lantai dasar",
      label: "Kantor",
      photo: "/images/addresses/office-1.jpg",
      latitude: -6.1944,
      longitude: 106.8229,
    },
  },
  {
    id: 3,
    createdAt: "2024-06-03T14:20:00Z",
    paymentStatus: "PENDING",
    deliveryStatus: null,
    trackingNumber: null,
    price: 35000,
    distance: 8.5,
    qrCodeImage: null,
    payment: {
      id: 3,
      createdAt: "2024-06-03T14:20:00Z",
      paymentMethod: null,
      status: "PENDING",
      expiryDate: "2024-06-03T23:59:59Z",
      externalId: "EXT003",
      invoiceId: "INV003",
      invoiceUrl: "https://checkout.xendit.co/web/659be",
    },
    shipmentHistories: [
      {
        id: 5,
        createdAt: "2024-06-03T14:20:00Z",
        status: "PENDING",
        description: "Shipment created with total price 35000 cents",
      },
    ],
    shipmentDetail: {
      id: 3,
      createdAt: "2024-06-03T14:20:00Z",
      weight: 3200,
      deliveryType: "next_day",
      destinationAddress: "Jl. Kuningan Raya No. 52, Jakarta Selatan",
      packageType: "Makanan",
      pickupProof: null,
      receiptProof: null,
      destinationLatitude: -6.2383,
      destinationLongitude: 106.8317,
      recipientName: "Budi Santoso",
      recipientPhone: "081567890123",
      senderName: "John Doe",
      senderPhone: "081234567890",
      basePrice: 18000,
      distancePrice: 9000,
      weightPrice: 8000,
      user: {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
      },
    },
    pickupAddress: {
      id: 3,
      address: "Jl. Kemang Raya No. 88, RT 005/RW 001, Kemang, Jakarta Selatan",
      tag: "Cafe dengan papan nama hijau, sebelah toko bunga",
      label: "Cafe",
      photo: "/images/addresses/cafe-1.jpg",
      latitude: -6.2615,
      longitude: 106.8149,
    },
  },
  {
    id: 4,
    createdAt: "2024-06-04T09:45:00Z",
    paymentStatus: "PAID",
    deliveryStatus: "PICKED_UP",
    trackingNumber: "KA240604004",
    price: 55000,
    distance: 15.3,
    qrCodeImage: "/images/qr/qr-004.png",
    payment: {
      id: 4,
      createdAt: "2024-06-04T09:45:00Z",
      paymentMethod: "GOPAY",
      status: "PAID",
      expiryDate: "2024-06-04T23:59:59Z",
      externalId: "EXT004",
      invoiceId: "INV004",
      invoiceUrl: "https://checkout.xendit.co/web/659bf",
    },
    shipmentHistories: [
      {
        id: 6,
        createdAt: "2024-06-04T09:45:00Z",
        status: "PENDING",
        description: "Shipment created with total price 55000 cents",
      },
      {
        id: 7,
        createdAt: "2024-06-04T11:30:00Z",
        status: "PICKED_UP",
        description: "Shipment picked up by courier",
      },
    ],
    shipmentDetail: {
      id: 4,
      createdAt: "2024-06-04T09:45:00Z",
      weight: 7800,
      deliveryType: "regular",
      destinationAddress: "Jl. Thamrin No. 1, Jakarta Pusat",
      packageType: "Pakaian",
      pickupProof: "/images/proof/pickup-004.jpg",
      receiptProof: null,
      destinationLatitude: -6.1944,
      destinationLongitude: 106.8229,
      recipientName: "Maya Sari",
      recipientPhone: "081345678901",
      senderName: "Michael Johnson",
      senderPhone: "081345678901",
      basePrice: 25000,
      distancePrice: 10000,
      weightPrice: 20000,
      user: {
        id: 3,
        fullName: "Michael Johnson",
        email: "michael@example.com",
      },
    },
    pickupAddress: {
      id: 4,
      address:
        "Jl. Senopati No. 12, RT 003/RW 004, Kebayoran Baru, Jakarta Selatan",
      tag: "Ruko 2 lantai warna biru, ada spanduk promo",
      label: "Toko",
      photo: "/images/addresses/shop-1.jpg",
      latitude: -6.2355,
      longitude: 106.8071,
    },
  },
  {
    id: 5,
    createdAt: "2024-06-05T16:00:00Z",
    paymentStatus: "FAILED",
    deliveryStatus: null,
    trackingNumber: null,
    price: 28000,
    distance: 6.7,
    qrCodeImage: null,
    payment: {
      id: 5,
      createdAt: "2024-06-05T16:00:00Z",
      paymentMethod: "BANK_TRANSFER",
      status: "FAILED",
      expiryDate: "2024-06-05T23:59:59Z",
      externalId: "EXT005",
      invoiceId: "INV005",
      invoiceUrl: "https://checkout.xendit.co/web/659bg",
    },
    shipmentHistories: [
      {
        id: 8,
        createdAt: "2024-06-05T16:00:00Z",
        status: "PENDING",
        description: "Shipment created with total price 28000 cents",
      },
      {
        id: 9,
        createdAt: "2024-06-05T16:30:00Z",
        status: "FAILED",
        description: "Payment failed for this shipment",
      },
    ],
    shipmentDetail: {
      id: 5,
      createdAt: "2024-06-05T16:00:00Z",
      weight: 2100,
      deliveryType: "same_day",
      destinationAddress: "Jl. Ampera Raya No. 33, Jakarta Selatan",
      packageType: "Dokumen",
      pickupProof: null,
      receiptProof: null,
      destinationLatitude: -6.2648,
      destinationLongitude: 106.789,
      recipientName: "Andi Wijaya",
      recipientPhone: "081765432109",
      senderName: "Jane Smith",
      senderPhone: "081987654321",
      basePrice: 16000,
      distancePrice: 8000,
      weightPrice: 4000,
      user: {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
      },
    },
    pickupAddress: {
      id: 5,
      address: "Jl. Fatmawati No. 77, RT 007/RW 002, Cilandak, Jakarta Selatan",
      tag: "Rumah kontrakan 2 lantai, cat hijau muda",
      label: "Kontrakan",
      photo: "/images/addresses/rental-1.jpg",
      latitude: -6.2897,
      longitude: 106.7918,
    },
  },
];

// ============================================================
// Mock service functions
// ============================================================

export const mockShipmentService = {
  getAll: async (): Promise<Shipment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockShipments;
  },

  getById: async (id: number): Promise<Shipment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockShipments.find((shipment) => shipment.id === id) ?? null;
  },

  getByTrackingNumber: async (
    trackingNumber: string,
  ): Promise<Shipment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return (
      mockShipments.find(
        (shipment) => shipment.trackingNumber === trackingNumber,
      ) ?? null
    );
  },

  search: async (query: string): Promise<Shipment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const lowerQuery = query.toLowerCase();
    return mockShipments.filter(
      (shipment) =>
        shipment.trackingNumber?.toLowerCase().includes(lowerQuery) ||
        shipment.shipmentDetail.packageType
          .toLowerCase()
          .includes(lowerQuery) ||
        shipment.pickupAddress?.address.toLowerCase().includes(lowerQuery) ||
        shipment.shipmentDetail.destinationAddress
          .toLowerCase()
          .includes(lowerQuery) ||
        shipment.shipmentDetail.recipientName
          .toLowerCase()
          .includes(lowerQuery),
    );
  },
};
