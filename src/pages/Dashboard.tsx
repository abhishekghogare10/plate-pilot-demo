import React from 'react';
import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TeamOutlined,
  FireOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/utils/format';

const salesByHour = [
  { hour: '9 AM', sales: 12000 },
  { hour: '10 AM', sales: 18000 },
  { hour: '11 AM', sales: 25000 },
  { hour: '12 PM', sales: 45000 },
  { hour: '1 PM', sales: 52000 },
  { hour: '2 PM', sales: 38000 },
  { hour: '3 PM', sales: 22000 },
  { hour: '4 PM', sales: 18000 },
  { hour: '5 PM', sales: 15000 },
  { hour: '6 PM', sales: 28000 },
  { hour: '7 PM', sales: 48000 },
  { hour: '8 PM', sales: 55000 },
  { hour: '9 PM', sales: 42000 },
  { hour: '10 PM', sales: 28000 },
];

const categoryMix = [
  { name: 'Main Course', value: 45, color: '#FF6B35' },
  { name: 'Biryani', value: 25, color: '#F7931E' },
  { name: 'Starters', value: 15, color: '#FDC830' },
  { name: 'Beverages', value: 10, color: '#37B7C3' },
  { name: 'Desserts', value: 5, color: '#088395' },
];

const paymentMix = [
  { method: 'UPI', amount: 180000 },
  { method: 'Cash', amount: 95000 },
  { method: 'Card', amount: 125000 },
  { method: 'Wallet', amount: 42000 },
];

const topItems = [
  { name: 'Butter Chicken', orders: 85 },
  { name: 'Biryani', orders: 72 },
  { name: 'Paneer Tikka', orders: 65 },
  { name: 'Naan', orders: 124 },
  { name: 'Dal Makhani', orders: 58 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Today's overview and quick actions</p>
        </div>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            New Order
          </Button>
        </Space>
      </div>

      {/* KPIs */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Sales"
              value={442000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix={
                <span className="text-sm ml-2">
                  <ArrowUpOutlined /> 12.3%
                </span>
              }
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Orders"
              value={156}
              valueStyle={{ color: '#FF6B35' }}
              prefix={<ShoppingOutlined />}
              suffix={
                <span className="text-sm ml-2">
                  <ArrowUpOutlined /> 8.1%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Order Value"
              value={2833}
              precision={2}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Running KOTs"
              value={12}
              valueStyle={{ color: '#cf1322' }}
              prefix={<FireOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Sales by Hour" className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesByHour}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF6B35" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Category Mix" className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryMix}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Payment Methods">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paymentMix}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="amount" fill="#F7931E" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Top 5 Items">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topItems} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="orders" fill="#37B7C3" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Tables Status">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Statistic title="Occupied" value={8} suffix="/ 25" valueStyle={{ fontSize: '24px' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Reserved" value={3} valueStyle={{ fontSize: '24px', color: '#F7931E' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Vacant" value={12} valueStyle={{ fontSize: '24px', color: '#52c41a' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Cleaning" value={2} valueStyle={{ fontSize: '24px', color: '#888' }} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="UPI Payments">
            <Statistic
              title="Success Rate"
              value={96.8}
              precision={1}
              suffix="%"
              valueStyle={{ color: '#52c41a', fontSize: '36px' }}
            />
            <div className="mt-4 text-muted-foreground">
              <div>Total Transactions: 124</div>
              <div>Failed: 4</div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Customer Insights">
            <Statistic title="Today's Customers" value={89} suffix="guests" valueStyle={{ fontSize: '28px' }} />
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <div>New: 12</div>
              <div>Returning: 77</div>
              <div>Avg Bill: {formatCurrency(2833)}</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
