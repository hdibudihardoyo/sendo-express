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
    name: "Create Shipment",
    key: "shipments.create",
    resource: "shipments",
  },
  {
    id: 2,
    name: "Read Shipment",
    key: "shipments.read",
    resource: "shipments",
  },
  {
    id: 3,
    name: "Create Employee",
    key: "employee.create",
    resource: "employee",
  },
  {
    id: 4,
    name: "Read Employee",
    key: "employee.read",
    resource: "employee",
  },
  {
    id: 5,
    name: "Update Employee",
    key: "employee.update",
    resource: "employee",
  },
  {
    id: 6,
    name: "Delete Employee",
    key: "employee.delete",
    resource: "employee",
  },
  {
    id: 7,
    name: "Create Branch",
    key: "branches.create",
    resource: "branches",
  },
  {
    id: 8,
    name: "Read Branch",
    key: "branches.read",
    resource: "branches",
  },
  {
    id: 9,
    name: "Update Branch",
    key: "branches.update",
    resource: "branches",
  },
  {
    id: 10,
    name: "Delete Branch",
    key: "branches.delete",
    resource: "branches",
  },
  {
    id: 11,
    name: "Read History",
    key: "history.read",
    resource: "history",
  },
  {
    id: 12,
    name: "Read Delivery",
    key: "delivery.read",
    resource: "delivery",
  },
  {
    id: 13,
    name: "Update Delivery",
    key: "delivery.update",
    resource: "delivery",
  },
  {
    id: 14,
    name: "Read Shipment Branch",
    key: "shipment-branch.read",
    resource: "shipment-branch",
  },
  {
    id: 15,
    name: "Input Shipment Branch",
    key: "shipment-branch.input",
    resource: "shipment-branch",
  },
  {
    id: 16,
    name: "Read Permissions",
    key: "permissions.read",
    resource: "permissions",
  },
  {
    id: 17,
    name: "Manage Permissions",
    key: "permissions.manage",
    resource: "permissions",
  },
  {
    id: 18,
    name: "Track Packages",
    key: "packages.track",
    resource: "packages",
  },
  {
    id: 19,
    name: "Scan Packages",
    key: "packages.scan",
    resource: "packages",
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
    name: "Customer",
    key: "customer",
    permissions: RolePermissions.filter((p) => [2, 18].includes(p.id)),
  },
  {
    id: 3,
    name: "Courier",
    key: "courier",
    permissions: RolePermissions.filter((p) => [12, 13, 18, 19].includes(p.id)),
  },
  {
    id: 4,
    name: "Admin Branch",
    key: "admin-branch",
    permissions: RolePermissions.filter((p) =>
      [1, 2, 7, 8, 9, 10, 14, 15].includes(p.id),
    ),
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
