import { useEffect } from "react";

// Meta data configuration for all pages
export interface MetaData {
  title: string;
  description: string;
}

// Custom hook for managing meta tags
export const useMeta = (meta: MetaData) => {
  useEffect(() => {
    // Update document title
    if (meta.title) {
      document.title = meta.title;
    }

    // Update meta description
    if (meta.description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", meta.description);
    }
  }, [meta]);
};

export const META_DATA: Record<string, MetaData> = {
  dashboard: {
    title: "Dashboard - Sendo Express",
    description:
      "Dashboard utama untuk mengelola pengiriman dan melihat statistik pengiriman paket",
  },
  login: {
    title: "Login - Sendo Express",
    description:
      "Masuk ke akun Sendo Express untuk mengakses layanan pengiriman paket",
  },
  register: {
    title: "Daftar - Sendo Express",
    description:
      "Daftar akun baru Sendo Express untuk mulai menggunakan layanan pengiriman",
  },
  profile: {
    title: "Profil - Sendo Express",
    description:
      "Kelola informasi profil dan pengaturan akun Sendo Express Anda",
  },
  delivery: {
    title: "Pengiriman - Sendo Express",
    description:
      "Kelola dan pantau semua pengiriman paket yang sedang berlangsung",
  },
  "send-package": {
    title: "Kirim Paket - Sendo Express",
    description:
      "Kirim paket dengan mudah dan aman melalui layanan Sendo Express",
  },
  "send-package-add": {
    title: "Buat Pengiriman Baru - Sendo Express",
    description:
      "Buat pengiriman paket baru dengan mengisi detail alamat dan informasi paket",
  },
  "send-package-detail": {
    title: "Detail Pengiriman - Sendo Express",
    description: "Lihat detail lengkap pengiriman paket dan informasi tracking",
  },
  "send-package-pay": {
    title: "Pembayaran Pengiriman - Sendo Express",
    description: "Lakukan pembayaran untuk pengiriman paket Anda",
  },
  history: {
    title: "Riwayat Pengiriman - Sendo Express",
    description:
      "Lihat riwayat semua pengiriman paket yang pernah Anda lakukan",
  },
  "history-detail": {
    title: "Detail Riwayat Pengiriman - Sendo Express",
    description: "Lihat detail lengkap riwayat pengiriman paket",
  },
  "track-package": {
    title: "Lacak Paket - Sendo Express",
    description: "Lacak dan cek status pengiriman paket dengan nomor resi",
  },
  branch: {
    title: "Kelola Cabang - Sendo Express",
    description: "Kelola informasi cabang dan lokasi layanan Sendo Express",
  },
  role: {
    title: "Kelola Role - Sendo Express",
    description: "Kelola role dan hak akses pengguna dalam sistem",
  },
  employee: {
    title: "Kelola Karyawan - Sendo Express",
    description: "Kelola data karyawan dan informasi personil",
  },
  "user-addresses": {
    title: "Alamat Saya - Sendo Express",
    description:
      "Kelola alamat pengiriman dan penerima untuk kemudahan berkirim",
  },
  "user-addresses-add": {
    title: "Tambah Alamat - Sendo Express",
    description: "Tambah alamat baru untuk pengiriman paket",
  },
  "user-addresses-edit": {
    title: "Edit Alamat - Sendo Express",
    description: "Edit dan perbarui informasi alamat pengiriman",
  },
  "shipment-branch": {
    title: "Pengiriman Cabang - Sendo Express",
    description: "Kelola pengiriman antar cabang dan transfer paket",
  },
};
