export interface OrganizationData {
  id?: number;
  code: string;
  description: string;
  isActive: boolean;
  isNew?: boolean;
  isUpdate?: boolean;
  isDeleted?: boolean;
}
