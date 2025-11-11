import { Role } from '@/types';

export const PERMISSIONS = {
  VIEW_DASHBOARD: ['SuperAdmin', 'Admin', 'Manager', 'Viewer', 'Accountant', 'Cashier'],
  MANAGE_MENU: ['SuperAdmin', 'Admin', 'Manager'],
  POS_BILLING: ['SuperAdmin', 'Admin', 'Manager', 'Cashier'],
  VIEW_ORDERS: ['SuperAdmin', 'Admin', 'Manager', 'Cashier', 'Waiter', 'Chef'],
  KDS_ACCESS: ['SuperAdmin', 'Admin', 'Chef', 'Manager'],
  MANAGE_TABLES: ['SuperAdmin', 'Admin', 'Manager', 'Waiter'],
  MANAGE_INVENTORY: ['SuperAdmin', 'Admin', 'Manager'],
  VIEW_CRM: ['SuperAdmin', 'Admin', 'Manager'],
  VIEW_REPORTS: ['SuperAdmin', 'Admin', 'Manager', 'Accountant', 'Viewer'],
  MANAGE_USERS: ['SuperAdmin', 'Admin'],
  MANAGE_SETTINGS: ['SuperAdmin', 'Admin'],
  VIEW_ACCOUNTING: ['SuperAdmin', 'Admin', 'Accountant'],
  MANAGE_SUBSCRIPTION: ['SuperAdmin', 'Admin'],
};

export const hasPermission = (role: Role, permission: keyof typeof PERMISSIONS): boolean => {
  return PERMISSIONS[permission].includes(role);
};

export const getRoleDescription = (role: Role): string => {
  const descriptions: Record<Role, string> = {
    SuperAdmin: 'Full system access across all tenants',
    Admin: 'Complete tenant administration',
    Manager: 'Operations, orders, inventory, and reports',
    Cashier: 'POS billing and order management',
    Chef: 'Kitchen display and KOT management',
    Waiter: 'Table and order management',
    Accountant: 'Financial reports and invoices',
    Viewer: 'Read-only dashboard and reports access',
  };
  return descriptions[role];
};
