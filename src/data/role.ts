// Role and Permission related types and mock data
import type {
  Role,
  Permission,
  RolePermission,
  UpdateRolePermissionsRequest,
} from "../lib/api/types/role";

// Mock permissions data
export const permissions: Permission[] = [
  {
    id: 1,
    name: "View Branches",
    key: "branches.view",
  },
  {
    id: 2,
    name: "Create Branches",
    key: "branches.create",
  },
  {
    id: 3,
    name: "Update Branches",
    key: "branches.update",
  },
  {
    id: 4,
    name: "Delete Branches",
    key: "branches.delete",
  },
  {
    id: 5,
    name: "View Shipments",
    key: "shipments.view",
  },
  {
    id: 6,
    name: "Create Shipments",
    key: "shipments.create",
  },
  {
    id: 7,
    name: "Update Shipments",
    key: "shipments.update",
  },
  {
    id: 8,
    name: "Cancel Shipments",
    key: "shipments.cancel",
  },
  {
    id: 9,
    name: "View Employees",
    key: "employees.view",
  },
  {
    id: 10,
    name: "Create Employees",
    key: "employees.create",
  },
  {
    id: 11,
    name: "Update Employees",
    key: "employees.update",
  },
  {
    id: 12,
    name: "Delete Employees",
    key: "employees.delete",
  },
  {
    id: 13,
    name: "View Roles",
    key: "roles.view",
  },
  {
    id: 14,
    name: "Manage Permissions",
    key: "permissions.manage",
  },
];

const RolePermissions: RolePermission[] = permissions.map((p) => ({
  ...p,
  resource: p.key.split(".")[0],
}));

// Mock roles data with assigned permissions
export const roles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    key: "super-admin",
    permissions: RolePermissions,
  },
  {
    id: 2,
    name: "Branch Manager",
    key: "branch-manager",
    permissions: RolePermissions.slice(0, 8),
  },
  {
    id: 3,
    name: "Courier",
    key: "courier",
    permissions: RolePermissions.filter((p) => p.id === 5 || p.id === 7),
  },
  {
    id: 4,
    name: "Customer Service",
    key: "customer-service",
    permissions: RolePermissions.filter((p) => p.id === 5 || p.id === 8),
  },
  {
    id: 5,
    name: "HR Manager",
    key: "hr-manager",
    permissions: RolePermissions.filter((p) => p.id === 9 || p.id === 12),
  },
];

// Mock services for API integration
export const mockRoleService = {
  getRoles: async (): Promise<Role[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return roles;
  },

  getRoleById: async (id: number): Promise<Role | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return roles.find((role) => role.id === id) || null;
  },

  updateRolePermissions: async (
    id: number,
    data: UpdateRolePermissionsRequest,
  ): Promise<Role> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const roleIndex = roles.findIndex((role) => role.id === id);
    if (roleIndex === -1) throw new Error("Role not found");

    const updatedRole = { ...roles[roleIndex] };
    updatedRole.permissions = RolePermissions.filter((p) =>
      data.permissionIds.includes(p.id),
    );

    roles[roleIndex] = updatedRole;
    return updatedRole;
  },
};

export const mockPermissionService = {
  getPermissions: async (): Promise<Permission[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    return permissions;
  },

  getPermissionById: async (id: number): Promise<Permission | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return permissions.find((permission) => permission.id === id) || null;
  },
};
