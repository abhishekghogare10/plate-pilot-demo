import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Space, Select, Switch, Badge } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  ShopOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  InboxOutlined,
  TeamOutlined,
  GlobalOutlined,
  DollarOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  SettingOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTenant } from '@/context/TenantContext';
import { hasPermission } from '@/utils/permissions';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentTenant, tenants, setCurrentTenant } = useTenant();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      permission: 'VIEW_DASHBOARD',
    },
    {
      key: '/pos',
      icon: <ShoppingCartOutlined />,
      label: 'POS',
      permission: 'POS_BILLING',
    },
    {
      key: '/tables',
      icon: <AppstoreOutlined />,
      label: 'Tables',
      permission: 'MANAGE_TABLES',
    },
    {
      key: '/menu',
      icon: <UnorderedListOutlined />,
      label: 'Menu',
      permission: 'MANAGE_MENU',
    },
    {
      key: '/orders',
      icon: <UnorderedListOutlined />,
      label: 'Orders',
      permission: 'VIEW_ORDERS',
    },
    {
      key: '/kds',
      icon: <FireOutlined />,
      label: 'KDS',
      permission: 'KDS_ACCESS',
    },
    {
      key: '/inventory',
      icon: <InboxOutlined />,
      label: 'Inventory',
      permission: 'MANAGE_INVENTORY',
    },
    {
      key: '/crm',
      icon: <TeamOutlined />,
      label: 'CRM',
      permission: 'VIEW_CRM',
    },
    {
      key: '/online-orders',
      icon: <GlobalOutlined />,
      label: 'Online Orders',
      permission: 'VIEW_ORDERS',
    },
    {
      key: '/accounting',
      icon: <DollarOutlined />,
      label: 'Accounting',
      permission: 'VIEW_ACCOUNTING',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      permission: 'VIEW_REPORTS',
    },
    {
      key: '/subscription',
      icon: <CreditCardOutlined />,
      label: 'Subscription',
      permission: 'MANAGE_SUBSCRIPTION',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      permission: 'MANAGE_SETTINGS',
    },
  ];

  const filteredMenuItems = menuItems
    .filter(item => !item.permission || hasPermission(user?.role!, item.permission as any))
    .map(item => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: () => navigate(item.key),
    }));

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        className="bg-card border-r border-border"
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          {!collapsed ? (
            <h1 className="text-xl font-bold text-primary">RestaurantPOS</h1>
          ) : (
            <ShopOutlined className="text-2xl text-primary" />
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={filteredMenuItems}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-card border-b border-border px-4 flex items-center justify-between">
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg"
            />
            <Select
              value={currentTenant?.id}
              onChange={(value) => {
                const tenant = tenants.find(t => t.id === value);
                if (tenant) setCurrentTenant(tenant);
              }}
              style={{ width: 200 }}
              suffixIcon={<ShopOutlined />}
            >
              {tenants.map(tenant => (
                <Option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </Option>
              ))}
            </Select>
          </Space>

          <Space size="large">
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
            <Badge count={3}>
              <Button type="text" icon={<BellOutlined className="text-lg" />} />
            </Badge>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space className="cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.role}</div>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content className="m-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
