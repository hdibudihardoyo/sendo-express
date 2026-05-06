import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { roleService } from "@/lib/api/services/role";
import { permissionService } from "@/lib/api/services/permission";
import type { Permission, Role } from "@/lib/api/types/role";

export const usePermission = () => {
  const { user } = useAuth();

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getRoles(),
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
  });

  // Cari permissions berdasarkan role key dari login (misal "super-admin", "customer")
  const userPermissions: Permission[] =
    roles?.find((r: Role) => r.key === user?.role)?.permissions ?? [];

  const hasPermission = (permissionKey: string): boolean => {
    if (!user) return false;
    if (isLoading) return false;
    return userPermissions.some((p) => p.key === permissionKey);
  };

  const hasAnyPermission = (permissionKeys: string[]): boolean => {
    return permissionKeys.some((key) => hasPermission(key));
  };

  const hasAllPermission = (permissionKeys: string[]): boolean => {
    return permissionKeys.every((key) => hasPermission(key));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermission,
    isLoading,
  };
};

export const usePermissionApi = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => permissionService.getPermissions(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
