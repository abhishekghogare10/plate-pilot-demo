import { 
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  FireOutlined,
  InboxOutlined,
  TeamOutlined,
  GlobalOutlined,
  DollarOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  SettingOutlined,
  MailOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { hasPermission } from '@/utils/permissions';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    key: '/dashboard',
    icon: DashboardOutlined,
    label: 'Dashboard',
    permission: 'VIEW_DASHBOARD',
  },
  {
    key: '/pos',
    icon: ShoppingCartOutlined,
    label: 'POS',
    permission: 'POS_BILLING',
  },
  {
    key: '/tables',
    icon: AppstoreOutlined,
    label: 'Tables',
    permission: 'MANAGE_TABLES',
  },
  {
    key: '/menu',
    icon: UnorderedListOutlined,
    label: 'Menu',
    permission: 'MANAGE_MENU',
  },
  {
    key: '/orders',
    icon: UnorderedListOutlined,
    label: 'Orders',
    permission: 'VIEW_ORDERS',
  },
  {
    key: '/kds',
    icon: FireOutlined,
    label: 'KDS',
    permission: 'KDS_ACCESS',
  },
  {
    key: '/inventory',
    icon: InboxOutlined,
    label: 'Inventory',
    permission: 'MANAGE_INVENTORY',
  },
  {
    key: '/crm',
    icon: TeamOutlined,
    label: 'CRM',
    permission: 'VIEW_CRM',
  },
  {
    key: '/online-orders',
    icon: GlobalOutlined,
    label: 'Online Orders',
    permission: 'VIEW_ORDERS',
  },
  {
    key: '/accounting',
    icon: DollarOutlined,
    label: 'Accounting',
    permission: 'VIEW_ACCOUNTING',
  },
  {
    key: '/reports',
    icon: BarChartOutlined,
    label: 'Reports',
    permission: 'VIEW_REPORTS',
  },
  {
    key: '/subscription',
    icon: CreditCardOutlined,
    label: 'Subscription',
    permission: 'MANAGE_SUBSCRIPTION',
  },
  {
    key: '/email-templates',
    icon: MailOutlined,
    label: 'Email Templates',
    permission: 'MANAGE_SETTINGS',
  },
  {
    key: '/settings',
    icon: SettingOutlined,
    label: 'Settings',
    permission: 'MANAGE_SETTINGS',
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(user?.role!, item.permission as any)
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-border bg-card">
        {open ? (
          <div className="flex items-center gap-2">
            <ShopOutlined className="text-2xl text-primary" />
            <h1 className="text-xl font-bold text-foreground">RestaurantPOS</h1>
          </div>
        ) : (
          <ShopOutlined className="text-2xl text-primary" />
        )}
      </SidebarHeader>
      
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.key;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.key)}
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
