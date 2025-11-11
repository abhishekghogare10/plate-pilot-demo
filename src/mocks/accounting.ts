export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  customerName?: string;
  date: Date;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Void';
  paymentMethod?: string;
}

export interface Expense {
  id: string;
  category: string;
  vendor: string;
  amount: number;
  date: Date;
  description: string;
  billImage?: string;
  approvedBy?: string;
}

export interface TaxReport {
  period: string;
  totalSales: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
}

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2024-001',
    orderId: 'ORD-001',
    customerName: 'Rajesh Kumar',
    date: new Date('2024-01-15'),
    subtotal: 860,
    cgst: 77.4,
    sgst: 77.4,
    igst: 0,
    total: 1050.8,
    status: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2024-002',
    orderId: 'ORD-002',
    date: new Date('2024-01-15'),
    subtotal: 280,
    cgst: 25.2,
    sgst: 25.2,
    igst: 0,
    total: 330.4,
    status: 'Unpaid',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2024-003',
    orderId: 'ORD-003',
    customerName: 'Priya Sharma',
    date: new Date('2024-01-15'),
    subtotal: 1020,
    cgst: 91.8,
    sgst: 91.8,
    igst: 0,
    total: 1103.6,
    status: 'Paid',
    paymentMethod: 'Card',
  },
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    category: 'Utilities',
    vendor: 'Electricity Board',
    amount: 8500,
    date: new Date('2024-01-10'),
    description: 'Monthly electricity bill',
    approvedBy: 'Admin',
  },
  {
    id: 'exp-2',
    category: 'Supplies',
    vendor: 'Packaging Solutions',
    amount: 12000,
    date: new Date('2024-01-12'),
    description: 'Takeaway containers and packaging',
    approvedBy: 'Manager',
  },
  {
    id: 'exp-3',
    category: 'Maintenance',
    vendor: 'AC Services',
    amount: 5000,
    date: new Date('2024-01-14'),
    description: 'AC servicing and repairs',
    approvedBy: 'Admin',
  },
];

export const mockTaxReports: TaxReport[] = [
  {
    period: 'January 2024',
    totalSales: 450000,
    cgst: 40500,
    sgst: 40500,
    igst: 0,
    totalTax: 81000,
  },
  {
    period: 'December 2023',
    totalSales: 520000,
    cgst: 46800,
    sgst: 46800,
    igst: 0,
    totalTax: 93600,
  },
];
