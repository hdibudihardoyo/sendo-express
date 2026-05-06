import type { Branch } from "@/lib/api/types/branch";

export const branches: Branch[] = [
  {
    id: 1,
    name: "Cabang Jakarta",
    address: "Jl. Sudirman No. 1, Jakarta",
    phoneNumber: "081234567890",
  },
  {
    id: 2,
    name: "Cabang Bandung",
    address: "Jl. Asia Afrika No. 2, Bandung",
    phoneNumber: "081298765432",
  },
  {
    id: 3,
    name: "Cabang Surabaya",
    address: "Jl. Basuki Rahmat No. 3, Surabaya",
    phoneNumber: "081212345678",
  },
  {
    id: 4,
    name: "Cabang Medan",
    address: "Jl. Gatot Subroto No. 4, Medan",
    phoneNumber: "081223344556",
  },
];

// Legacy export for backward compatibility
export type BranchItem = Branch;

export const mockBranchService = {
  getAll: async (): Promise<Branch[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return branches;
  },

  getById: async (id: number): Promise<Branch | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return branches.find((branch) => branch.id === id) || null;
  },

  create: async (
    data: Omit<Branch, "id" | "created_at" | "updated_at">,
  ): Promise<Branch> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newBranch: Branch = {
      id: Math.max(...branches.map((b) => b.id)) + 1,
      ...data,
    };
    branches.push(newBranch);
    return newBranch;
  },

  update: async (
    id: number,
    data: Partial<Omit<Branch, "id" | "created_at" | "updated_at">>,
  ): Promise<Branch | null> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = branches.findIndex((branch) => branch.id === id);
    if (index === -1) return null;

    branches[index] = {
      ...branches[index],
      ...data,
    };
    return branches[index];
  },

  delete: async (id: number): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = branches.findIndex((branch) => branch.id === id);
    if (index === -1) return false;

    branches.splice(index, 1);
    return true;
  },
};
