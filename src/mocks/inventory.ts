export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: Date;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  gstin?: string;
  rating: number;
  leadTime: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  status: 'Draft' | 'Sent' | 'Received' | 'Closed';
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  expectedDelivery?: Date;
}

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Chicken Breast',
    category: 'Meat',
    unit: 'kg',
    currentStock: 25,
    minStock: 10,
    costPerUnit: 280,
    supplier: 'Fresh Meats Co.',
    lastRestocked: new Date('2024-01-10'),
  },
  {
    id: 'inv-2',
    name: 'Tomatoes',
    category: 'Vegetables',
    unit: 'kg',
    currentStock: 8,
    minStock: 15,
    costPerUnit: 40,
    supplier: 'Farm Fresh Ltd.',
    lastRestocked: new Date('2024-01-12'),
  },
  {
    id: 'inv-3',
    name: 'Basmati Rice',
    category: 'Grains',
    unit: 'kg',
    currentStock: 150,
    minStock: 50,
    costPerUnit: 120,
    supplier: 'Grain Traders',
    lastRestocked: new Date('2024-01-05'),
  },
  {
    id: 'inv-4',
    name: 'Olive Oil',
    category: 'Oils',
    unit: 'liter',
    currentStock: 12,
    minStock: 5,
    costPerUnit: 450,
    supplier: 'Premium Oils Inc.',
    lastRestocked: new Date('2024-01-08'),
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Fresh Meats Co.',
    phone: '+91 98765 43210',
    email: 'orders@freshmeats.com',
    gstin: '29ABCDE1234F1Z5',
    rating: 4.5,
    leadTime: 2,
  },
  {
    id: 'sup-2',
    name: 'Farm Fresh Ltd.',
    phone: '+91 98765 43211',
    email: 'sales@farmfresh.com',
    rating: 4.8,
    leadTime: 1,
  },
  {
    id: 'sup-3',
    name: 'Grain Traders',
    phone: '+91 98765 43212',
    email: 'info@graintraders.com',
    gstin: '29FGHIJ5678K2L6',
    rating: 4.2,
    leadTime: 3,
  },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2024-001',
    supplierId: 'sup-1',
    status: 'Sent',
    items: [
      {
        itemId: 'inv-1',
        itemName: 'Chicken Breast',
        quantity: 50,
        unitPrice: 280,
        total: 14000,
      },
    ],
    subtotal: 14000,
    tax: 2520,
    total: 16520,
    createdAt: new Date('2024-01-14'),
    expectedDelivery: new Date('2024-01-16'),
  },
  {
    id: 'po-2',
    poNumber: 'PO-2024-002',
    supplierId: 'sup-2',
    status: 'Draft',
    items: [
      {
        itemId: 'inv-2',
        itemName: 'Tomatoes',
        quantity: 30,
        unitPrice: 40,
        total: 1200,
      },
    ],
    subtotal: 1200,
    tax: 216,
    total: 1416,
    createdAt: new Date('2024-01-15'),
  },
];
