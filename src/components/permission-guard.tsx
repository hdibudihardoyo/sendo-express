import { type ReactNode } from "react";
import { usePermission } from "@/hooks/use-permission";
import { Skeleton } from "./ui/skeleton";

interface PermissionGuardProps {
  permission?: string;
  permissions?: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  permission,
  permissions,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, isLoading } = usePermission();

  if (isLoading) {
    return <Skeleton className="h-10" />;
  }

  // 1. Tidak ada permission
  if (!permission && !permissions) {
    return <>{children}</>;
  }

  // 2. Cek single permission
  if (permission) {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  // 3. Cek multiple permissions
  if (permissions) {
    return hasAnyPermission(permissions) ? <>{children}</> : <>{fallback}</>;
  }

  return <>{fallback}</>;
}

export default PermissionGuard;
