import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, tenantName: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem('restaurantPOS_auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setUser(parsed.user);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    // Mock login - in reality would hit an API
    const mockUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email,
      phone: '+91 9876543210',
      role: role as any,
      tenantId: 'tenant-1',
      status: 'active',
      lastLogin: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('restaurantPOS_auth', JSON.stringify({ user: mockUser }));
  };

  const signup = async (email: string, password: string, name: string, tenantName: string) => {
    const mockUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone: '',
      role: 'Admin',
      tenantId: 'tenant-' + Date.now(),
      status: 'active',
      lastLogin: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('restaurantPOS_auth', JSON.stringify({ user: mockUser }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurantPOS_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
