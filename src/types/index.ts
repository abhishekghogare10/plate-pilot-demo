export type Role = 'SuperAdmin' | 'Admin' | 'Manager' | 'Cashier' | 'Chef' | 'Waiter' | 'Accountant' | 'Viewer';

export type OrderStatus = 'Placed' | 'In-Kitchen' | 'Ready' | 'Served' | 'Billed' | 'Cancelled';
export type OrderChannel = 'dine-in' | 'takeaway' | 'delivery' | 'online';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'wallet';
export type TableStatus = 'vacant' | 'occupied' | 'reserved' | 'cleaning';
export type KOTStatus = 'Pending' | 'In-Progress' | 'Ready' | 'Served';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  tenantId: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  gstin?: string;
  currency: string;
  country: string;
  timezone: string;
  logo?: string;
  outlets: Outlet[];
  plan: string;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  limits: {
    outlets: number;
    users: number;
    menuItems: number;
    ordersPerMonth: number;
  };
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  code: string;
  categoryId: string;
  description?: string;
  price: number;
  variations?: ItemVariation[];
  addOns?: ItemAddOn[];
  tags: ('veg' | 'non-veg' | 'jain' | 'bestseller' | 'spicy')[];
  available: boolean;
  station?: string;
  image?: string;
}

export interface ItemVariation {
  id: string;
  name: string;
  price: number;
}

export interface ItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface Table {
  id: string;
  name: string;
  areaId: string;
  capacity: number;
  shape: 'round' | 'square';
  status: TableStatus;
  position?: { x: number; y: number };
}

export interface Area {
  id: string;
  name: string;
  outletId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  channel: OrderChannel;
  tableId?: string;
  customerId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  createdBy: string;
  payments: Payment[];
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  variationId?: string;
  addOnIds?: string[];
  notes?: string;
  kotId?: string;
}

export interface Payment {
  id: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  timestamp: Date;
}

export interface KOT {
  id: string;
  orderId: string;
  orderNumber: string;
  items: OrderItem[];
  station: string;
  status: KOTStatus;
  createdAt: Date;
  startedAt?: Date;
  readyAt?: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  visits: number;
  ltv: number;
  loyaltyPoints: number;
  tier?: 'Silver' | 'Gold' | 'Platinum';
  tags: string[];
  lastOrder?: Date;
}
