export interface ReportConfig {
  id: string;
  name: string;
  category: 'Sales' | 'Operations' | 'Inventory' | 'CRM' | 'Financial';
  description: string;
  icon: string;
}

export const mockReports: ReportConfig[] = [
  // Sales Reports
  {
    id: 'sales-summary',
    name: 'Sales Summary',
    category: 'Sales',
    description: 'Overall sales performance with trends',
    icon: 'line-chart',
  },
  {
    id: 'category-sales',
    name: 'Category Sales',
    category: 'Sales',
    description: 'Sales breakdown by menu categories',
    icon: 'pie-chart',
  },
  {
    id: 'item-sales',
    name: 'Item Sales',
    category: 'Sales',
    description: 'Top selling items and performance',
    icon: 'bar-chart',
  },
  {
    id: 'hourly-sales',
    name: 'Hourly Sales',
    category: 'Sales',
    description: 'Sales distribution by hour',
    icon: 'clock',
  },
  {
    id: 'channel-sales',
    name: 'Channel Sales',
    category: 'Sales',
    description: 'Dine-in vs Takeaway vs Delivery',
    icon: 'shop',
  },
  {
    id: 'payment-methods',
    name: 'Payment Methods',
    category: 'Sales',
    description: 'Payment type distribution',
    icon: 'credit-card',
  },
  
  // Operations Reports
  {
    id: 'order-summary',
    name: 'Order Summary',
    category: 'Operations',
    description: 'Total orders and average order value',
    icon: 'file-text',
  },
  {
    id: 'kot-sla',
    name: 'KOT SLA Report',
    category: 'Operations',
    description: 'Kitchen order turnaround times',
    icon: 'fire',
  },
  {
    id: 'table-occupancy',
    name: 'Table Occupancy',
    category: 'Operations',
    description: 'Table utilization and turnover',
    icon: 'appstore',
  },
  {
    id: 'staff-productivity',
    name: 'Staff Productivity',
    category: 'Operations',
    description: 'Orders handled per staff member',
    icon: 'team',
  },
  {
    id: 'cancellations',
    name: 'Cancellations Report',
    category: 'Operations',
    description: 'Cancelled orders and reasons',
    icon: 'close-circle',
  },
  {
    id: 'discounts-usage',
    name: 'Discounts Usage',
    category: 'Operations',
    description: 'Discount codes and coupon usage',
    icon: 'tag',
  },
  
  // Inventory Reports
  {
    id: 'stock-levels',
    name: 'Stock Levels',
    category: 'Inventory',
    description: 'Current inventory status',
    icon: 'inbox',
  },
  {
    id: 'consumption',
    name: 'Consumption Report',
    category: 'Inventory',
    description: 'Material usage and wastage',
    icon: 'fall',
  },
  {
    id: 'purchase-orders',
    name: 'Purchase Orders',
    category: 'Inventory',
    description: 'PO status and supplier performance',
    icon: 'shopping-cart',
  },
  {
    id: 'low-stock',
    name: 'Low Stock Alert',
    category: 'Inventory',
    description: 'Items below minimum levels',
    icon: 'warning',
  },
  
  // CRM Reports
  {
    id: 'customer-retention',
    name: 'Customer Retention',
    category: 'CRM',
    description: 'Repeat customer analysis',
    icon: 'user-add',
  },
  {
    id: 'loyalty-report',
    name: 'Loyalty Report',
    category: 'CRM',
    description: 'Points earned and redeemed',
    icon: 'gift',
  },
  {
    id: 'customer-lifetime-value',
    name: 'Customer Lifetime Value',
    category: 'CRM',
    description: 'LTV by customer segments',
    icon: 'dollar',
  },
  {
    id: 'feedback-analysis',
    name: 'Feedback Analysis',
    category: 'CRM',
    description: 'NPS scores and ratings',
    icon: 'star',
  },
  
  // Financial Reports
  {
    id: 'profit-loss',
    name: 'Profit & Loss',
    category: 'Financial',
    description: 'P&L statement',
    icon: 'fund',
  },
  {
    id: 'gst-report',
    name: 'GST Report',
    category: 'Financial',
    description: 'Tax collected and payable',
    icon: 'audit',
  },
  {
    id: 'expense-report',
    name: 'Expense Report',
    category: 'Financial',
    description: 'Operating expenses breakdown',
    icon: 'wallet',
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow',
    category: 'Financial',
    description: 'Cash in and out movements',
    icon: 'swap',
  },
];
