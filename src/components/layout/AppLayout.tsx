import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTenant } from '@/context/TenantContext';
import { hasPermission } from '@/utils/permissions';
import {
  LayoutDashboard,
  ShoppingCart,
  Grid3x3,
  List,
  Package,
  Users,
  Globe,
  DollarSign,
  BarChart3,
  CreditCard,
  Settings,
  Flame,
  Mail,
  LogOut,
  User,
  Bell,
  Store,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/NavLink';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentTenant, tenants, setCurrentTenant } = useTenant();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 856);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      permission: 'VIEW_DASHBOARD',
    },
    {
      key: '/pos',
      icon: ShoppingCart,
      label: 'POS',
      permission: 'POS_BILLING',
    },
    {
      key: '/tables',
      icon: Grid3x3,
      label: 'Tables',
      permission: 'MANAGE_TABLES',
    },
    {
      key: '/menu',
      icon: List,
      label: 'Menu',
      permission: 'MANAGE_MENU',
    },
    {
      key: '/orders',
      icon: List,
      label: 'Orders',
      permission: 'VIEW_ORDERS',
    },
    {
      key: '/kds',
      icon: Flame,
      label: 'KDS',
      permission: 'KDS_ACCESS',
    },
    {
      key: '/inventory',
      icon: Package,
      label: 'Inventory',
      permission: 'MANAGE_INVENTORY',
    },
    {
      key: '/crm',
      icon: Users,
      label: 'CRM',
      permission: 'VIEW_CRM',
    },
    {
      key: '/online-orders',
      icon: Globe,
      label: 'Online Orders',
      permission: 'VIEW_ORDERS',
    },
    {
      key: '/accounting',
      icon: DollarSign,
      label: 'Accounting',
      permission: 'VIEW_ACCOUNTING',
    },
    {
      key: '/reports',
      icon: BarChart3,
      label: 'Reports',
      permission: 'VIEW_REPORTS',
    },
    {
      key: '/subscription',
      icon: CreditCard,
      label: 'Subscription',
      permission: 'MANAGE_SUBSCRIPTION',
    },
    {
      key: '/email-templates',
      icon: Mail,
      label: 'Email Templates',
      permission: 'MANAGE_SETTINGS',
    },
    {
      key: '/settings',
      icon: Settings,
      label: 'Settings',
      permission: 'MANAGE_SETTINGS',
    },
  ];

  const filteredMenuItems = menuItems.filter(
    item => !item.permission || hasPermission(user?.role!, item.permission as any)
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center justify-center border-b border-border px-4">
        <h1 className="text-xl font-bold text-primary">RestaurantPOS</h1>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.key;
            return (
              <NavLink
                key={item.key}
                to={item.key}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sm font-medium",
                  "hover:bg-muted/50",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            {isMobile ? (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            
            <Select
              value={currentTenant?.id}
              onValueChange={(value) => {
                const tenant = tenants.find(t => t.id === value);
                if (tenant) setCurrentTenant(tenant);
              }}
            >
              <SelectTrigger className="w-[180px] md:w-[200px]">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {tenants.map(tenant => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2 md:px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.role}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside
            className={cn(
              "fixed left-0 top-16 bottom-0 z-30 bg-card border-r border-border transition-all duration-300",
              sidebarOpen ? "w-64" : "w-0 -translate-x-full"
            )}
          >
            <SidebarContent />
          </aside>
        )}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]",
            !isMobile && sidebarOpen ? "md:ml-64" : "ml-0"
          )}
        >
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
