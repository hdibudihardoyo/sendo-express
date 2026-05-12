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
