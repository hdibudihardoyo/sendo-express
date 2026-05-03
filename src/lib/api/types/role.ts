// Role and Permission related types

export interface ApiMeta {
  message: string;
  statusCode: number;
  success: boolean;
}

export interface Permission {
  id: number;
  name: string;
  key: string;
}

export interface PermissionResponse {
  meta: ApiMeta;
  data: Permission[];
}

export interface RolePermission {
  id: number;
  name: string;
  key: string;
  resource: string;
}

export interface Role {
  id: number;
  name: string;
  key: string;
  permissions: RolePermission[];
}

export interface RoleResponse {
  meta: ApiMeta;
  data: Role[];
}

export interface SingleRoleResponse {
  meta: ApiMeta;
  data: Role;
}

export interface UpdateRolePermissionsRequest {
  permissionIds: number[];
}

export interface UpdateRolePermissionsResponse {
  meta: ApiMeta;
  data: Role;
}
