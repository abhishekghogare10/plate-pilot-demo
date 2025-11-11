import React, { createContext, useContext, useState } from 'react';
import { Tenant } from '@/types';

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
}

const TenantContext = createContext<TenantContextType | null>(null);

const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Spice Garden Restaurant',
    gstin: '29ABCDE1234F1Z5',
    currency: 'INR',
    country: 'India',
    timezone: 'Asia/Kolkata',
    plan: 'Growth',
    outlets: [
      {
        id: 'outlet-1',
        name: 'Main Branch',
        address: '123 MG Road, Bangalore, Karnataka 560001',
        phone: '+91 80 12345678',
        email: 'main@spicegarden.com',
        gstin: '29ABCDE1234F1Z5',
      },
      {
        id: 'outlet-2',
        name: 'Airport Branch',
        address: 'Terminal 1, Kempegowda Intl Airport, Bangalore 560300',
        phone: '+91 80 87654321',
        email: 'airport@spicegarden.com',
        gstin: '29ABCDE1234F1Z6',
      },
    ],
  },
];

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(mockTenants[0]);
  const [tenants] = useState<Tenant[]>(mockTenants);

  return (
    <TenantContext.Provider value={{ currentTenant, setCurrentTenant, tenants }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
};
