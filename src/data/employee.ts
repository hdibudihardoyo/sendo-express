import type { User } from "@/lib/api/types/auth";
import type { Branch } from "@/lib/api/types/branch";

export interface EmployeeItem {
  id: number;
  user_id: number;
  branch_id: number;
  type: "courier" | "admin";
  user: User;
  branch: Branch;
}

export const employees: EmployeeItem[] = [
  {
    id: 1,
    user_id: 101,
    type: "courier",
    branch_id: 1,
    user: {
      id: 101,
      fullName: "Ahmad Rizky",
      role: "courier",
      email: "ahmad.rizky@kirimaja.com",
      avatar: null,
    },
    branch: {
      id: 1,
      name: "Cabang Jakarta",
      address: "Jl. Sudirman No. 1, Jakarta",
      phoneNumber: "081234567890",
    },
  },
  {
    id: 2,
    user_id: 102,
    type: "admin",
    branch_id: 2,

    user: {
      id: 102,
      fullName: "Siti Nurhaliza",
      email: "siti.nurhaliza@kirimaja.com",
      role: "",
      avatar: null,
    },
    branch: {
      id: 2,
      name: "Cabang Bandung",
      address: "Jl. Asia Afrika No. 2, Bandung",
      phoneNumber: "081298765432",
    },
  },
  {
    id: 3,
    user_id: 103,
    type: "courier",
    branch_id: 3,

    user: {
      id: 103,
      fullName: "Budi Santoso",
      email: "budi.santoso@kirimaja.com",
      role: "",
      avatar: null,
    },
    branch: {
      id: 3,
      name: "Cabang Surabaya",
      address: "Jl. Basuki Rahmat No. 3, Surabaya",
      phoneNumber: "081212345678",
    },
  },
  {
    id: 4,
    user_id: 104,
    type: "courier",
    branch_id: 1,

    user: {
      id: 104,
      fullName: "Maya Putri",
      email: "maya.putri@kirimaja.com",
      role: "",
      avatar: null,
    },
    branch: {
      id: 1,
      name: "Cabang Jakarta",
      address: "Jl. Sudirman No. 1, Jakarta",
      phoneNumber: "081234567890",
    },
  },
  {
    id: 5,
    user_id: 105,
    type: "admin",
    branch_id: 3,

    user: {
      id: 105,
      fullName: "Danu Wijaya",
      email: "danu.wijaya@kirimaja.com",
      role: "",
      avatar: null,
    },
    branch: {
      id: 3,
      name: "Cabang Surabaya",
      address: "Jl. Basuki Rahmat No. 3, Surabaya",
      phoneNumber: "081212345678",
    },
  },
];

export const mockEmployeeService = {
  getAll: async (): Promise<EmployeeItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return employees;
  },

  getById: async (id: number): Promise<EmployeeItem | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return employees.find((employee) => employee.id === id) || null;
  },

  getByBranchId: async (branchId: number): Promise<EmployeeItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return employees.filter((employee) => employee.branch_id === branchId);
  },

  create: async (
    data: Omit<
      EmployeeItem,
      "id" | "created_at" | "updated_at" | "user" | "branch"
    >,
  ): Promise<EmployeeItem> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // In real implementation, this would create user and fetch branch data
    const newEmployee: EmployeeItem = {
      id: Math.max(...employees.map((e) => e.id)) + 1,
      ...data,

      user: {
        id: data.user_id,
        fullName: "New User",
        email: `user${data.user_id}@kirimaja.com`,
        role: "",
        avatar: null,
      },
      branch: {
        id: data.branch_id,
        name: "Branch Name",
        address: "Branch Address",
        phoneNumber: "081234567890",
      },
    };

    employees.push(newEmployee);
    return newEmployee;
  },

  update: async (
    id: number,
    data: Partial<
      Omit<EmployeeItem, "id" | "created_at" | "updated_at" | "user" | "branch">
    >,
  ): Promise<EmployeeItem | null> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = employees.findIndex((employee) => employee.id === id);
    if (index === -1) return null;

    employees[index] = {
      ...employees[index],
      ...data,
    };
    return employees[index];
  },

  delete: async (id: number): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = employees.findIndex((employee) => employee.id === id);
    if (index === -1) return false;

    employees.splice(index, 1);
    return true;
  },
};
