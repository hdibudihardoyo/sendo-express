import { apiClient } from "../axios";
import { handleAxiosError } from "../../utils/error-handler";
import type { AxiosErrorType } from "../../utils/api-error-types";
import type {
  Role,
  UpdateRolePermissionsRequest,
  RoleResponse,
  SingleRoleResponse,
  UpdateRolePermissionsResponse,
} from "../types/role";

export const roleService = {
  async getRoles(): Promise<Role[]> {
    try {
      const response = await apiClient.get<RoleResponse>("/api/roles");
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async getRoleById(id: number): Promise<Role> {
    try {
      const response = await apiClient.get<SingleRoleResponse>(
        `/api/roles/${id}`,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },

  async updateRolePermissions(
    id: number,
    data: UpdateRolePermissionsRequest,
  ): Promise<Role> {
    try {
      const response = await apiClient.patch<UpdateRolePermissionsResponse>(
        `/api/roles/${id}`,
        data,
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error as AxiosErrorType);
      throw new Error(errorMessage);
    }
  },
};
