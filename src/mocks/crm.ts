import { Customer } from '@/types';

export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  orderId: string;
  rating: number;
  nps: number;
  comment: string;
  category: 'Food Quality' | 'Service' | 'Ambiance' | 'Value' | 'Other';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'SMS' | 'WhatsApp' | 'Email';
  status: 'Draft' | 'Scheduled' | 'Sent' | 'Completed';
  audience: string;
  message: string;
  sentCount: number;
  openRate?: number;
  clickRate?: number;
  scheduledAt?: Date;
  createdAt: Date;
}

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 12345',
    email: 'rajesh@example.com',
    visits: 25,
    ltv: 45000,
    loyaltyPoints: 1250,
    tier: 'Gold',
    tags: ['Regular', 'VIP'],
    lastOrder: new Date('2024-01-14'),
  },
  {
    id: 'cust-2',
    name: 'Priya Sharma',
    phone: '+91 98765 12346',
    email: 'priya@example.com',
    visits: 42,
    ltv: 78000,
    loyaltyPoints: 2340,
    tier: 'Platinum',
    tags: ['VIP', 'Birthday-Jan'],
    lastOrder: new Date('2024-01-15'),
  },
  {
    id: 'cust-3',
    name: 'Amit Patel',
    phone: '+91 98765 12347',
    visits: 8,
    ltv: 12000,
    loyaltyPoints: 340,
    tier: 'Silver',
    tags: ['New'],
    lastOrder: new Date('2024-01-10'),
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: 'fb-1',
    customerId: 'cust-1',
    customerName: 'Rajesh Kumar',
    orderId: 'ORD-001',
    rating: 5,
    nps: 9,
    comment: 'Excellent food and service! Will definitely come back.',
    category: 'Food Quality',
    createdAt: new Date('2024-01-14T14:00:00'),
  },
  {
    id: 'fb-2',
    customerId: 'cust-2',
    customerName: 'Priya Sharma',
    orderId: 'ORD-002',
    rating: 4,
    nps: 8,
    comment: 'Good experience overall, but service was a bit slow.',
    category: 'Service',
    createdAt: new Date('2024-01-15T13:30:00'),
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Weekend Special Offer',
    type: 'WhatsApp',
    status: 'Completed',
    audience: 'Gold & Platinum Members',
    message: 'Enjoy 20% off on all orders this weekend! Use code: WEEKEND20',
    sentCount: 342,
    openRate: 85,
    clickRate: 42,
    scheduledAt: new Date('2024-01-12T10:00:00'),
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'camp-2',
    name: 'Birthday Wishes',
    type: 'SMS',
    status: 'Scheduled',
    audience: 'January Birthdays',
    message: 'Happy Birthday! Get a free dessert on your special day.',
    sentCount: 0,
    scheduledAt: new Date('2024-01-20T09:00:00'),
    createdAt: new Date('2024-01-15'),
  },
];
