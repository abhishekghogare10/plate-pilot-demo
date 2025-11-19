import React from 'react';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TenantProvider } from '@/context/TenantContext';

// Public Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

// App Pages
import ResponsiveAppLayout from '@/components/layout/ResponsiveAppLayout';
import Dashboard from '@/pages/Dashboard';
import POS from '@/pages/POS';
import Menu from '@/pages/Menu';
import Tables from '@/pages/Tables';
import KDS from '@/pages/KDS';
import Subscription from '@/pages/Subscription';
import Orders from '@/pages/Orders';
import Inventory from '@/pages/Inventory';
import CRM from '@/pages/CRM';
import OnlineOrders from '@/pages/OnlineOrders';
import Accounting from '@/pages/Accounting';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import EmailTemplates from '@/pages/EmailTemplates';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Dashboard />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pos"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <POS />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Menu />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tables"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Tables />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kds"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <KDS />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Subscription />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Orders />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Inventory />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/crm"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <CRM />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/online-orders"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <OnlineOrders />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounting"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Accounting />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Reports />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <Settings />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/email-templates"
        element={
          <ProtectedRoute>
            <ResponsiveAppLayout>
              <EmailTemplates />
            </ResponsiveAppLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FF6B35',
              borderRadius: 8,
            },
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <AntApp>
            <BrowserRouter>
              <AuthProvider>
                <TenantProvider>
                  <Toaster />
                  <Sonner />
                  <AppRoutes />
                </TenantProvider>
              </AuthProvider>
            </BrowserRouter>
          </AntApp>
        </ConfigProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
