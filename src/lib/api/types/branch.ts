// Branch related types

export interface CreateBranchRequest {
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface BranchResponse {
  message: string;
  data: Branch[];
}

export interface SingleBranchResponse {
  message: string;
  data: Branch;
}

// Legacy types for backward compatibility
export type BranchRequest = CreateBranchRequest;
