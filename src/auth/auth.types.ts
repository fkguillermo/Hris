export interface AuthUser {
  employeeId: number;
  companyId: number;
  canProcess: boolean;
  canApprove: boolean;
  canPost: boolean;
}
