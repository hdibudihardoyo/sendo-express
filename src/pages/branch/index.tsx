import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMeta, META_DATA } from "@/hooks/use-meta";

// Components
import { useBranches } from "@/hooks/use-branch";
import { DataTable, columns, AddBranchModal } from "./components";
import { PermissionGuard } from "@/components";

export default function BranchPage() {
  // Use custom meta hook
  useMeta(META_DATA.branch);

  const { data: branches = [], error } = useBranches();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.phoneNumber.includes(searchTerm),
  );

  if (error) {
    return (
      <Page title="Daftar Cabang 🏢">
        <div className="text-red-500 font-semibold">
          <p>Terjadi kesalahan = {error.message}</p>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title="Daftar Cabang 🏢"
      action={
        <PermissionGuard permission="branches.create">
          <AddBranchModal />
        </PermissionGuard>
      }
    >
      <Input
        type="text"
        placeholder="Cari Cabang"
        className="mb-4 w-full max-w-sm bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataTable
        data={filteredBranches}
        columns={columns()}
        title="Semua Cabang"
      />
    </Page>
  );
}
