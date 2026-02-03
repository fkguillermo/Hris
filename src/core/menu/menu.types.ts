export interface MenuItem {
  menuItemId: number;
  parentMenuItemId?: number;
  menuCode: string;
  menuName: string;
  routeUrl?: string;
  icon?: string;
  displayOrder: number;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  expandable: boolean;
  children?: MenuItem[];
}
