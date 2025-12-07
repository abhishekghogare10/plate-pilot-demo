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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Today's overview and quick actions</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="middle" className="w-full sm:w-auto">
          New Order
        </Button>
      </div>

      {/* KPIs */}
      <Row gutter={[12, 12]}>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card size="small" className="h-full">
            <Statistic
              title={<span className="text-xs sm:text-sm">Today's Sales</span>}
              value={442000}
              precision={2}
              valueStyle={{ color: '#3f8600', fontSize: '18px' }}
              prefix={<DollarOutlined />}
              suffix={
                <span className="text-xs ml-1 hidden sm:inline">
                  <ArrowUpOutlined /> 12.3%
                </span>
              }
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card size="small" className="h-full">
            <Statistic
              title={<span className="text-xs sm:text-sm">Orders</span>}
              value={156}
              valueStyle={{ color: '#FF6B35', fontSize: '18px' }}
              prefix={<ShoppingOutlined />}
              suffix={
                <span className="text-xs ml-1 hidden sm:inline">
                  <ArrowUpOutlined /> 8.1%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card size="small" className="h-full">
            <Statistic
              title={<span className="text-xs sm:text-sm">Avg Order Value</span>}
              value={2833}
              precision={2}
              valueStyle={{ fontSize: '18px' }}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card size="small" className="h-full">
            <Statistic
              title={<span className="text-xs sm:text-sm">Running KOTs</span>}
              value={12}
              valueStyle={{ color: '#cf1322', fontSize: '18px' }}
              prefix={<FireOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={16}>
          <Card title={<span className="text-sm sm:text-base">Sales by Hour</span>} size="small" className="h-full">
            <div className="h-[200px] sm:h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesByHour}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
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
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title={<span className="text-sm sm:text-base">Category Mix</span>} size="small" className="h-full">
            <div className="h-[200px] sm:h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryMix}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius="70%"
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
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card title={<span className="text-sm sm:text-base">Payment Methods</span>} size="small">
            <div className="h-[180px] sm:h-[220px] md:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMix}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="amount" fill="#F7931E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<span className="text-sm sm:text-base">Top 5 Items</span>} size="small">
            <div className="h-[180px] sm:h-[220px] md:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topItems} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#37B7C3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <Card title={<span className="text-sm sm:text-base">Tables Status</span>} size="small">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Statistic title="Occupied" value={8} suffix="/ 25" valueStyle={{ fontSize: '20px' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Reserved" value={3} valueStyle={{ fontSize: '20px', color: '#F7931E' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Vacant" value={12} valueStyle={{ fontSize: '20px', color: '#52c41a' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Cleaning" value={2} valueStyle={{ fontSize: '20px', color: '#888' }} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title={<span className="text-sm sm:text-base">UPI Payments</span>} size="small">
            <Statistic
              title="Success Rate"
              value={96.8}
              precision={1}
              suffix="%"
              valueStyle={{ color: '#52c41a', fontSize: '28px' }}
            />
            <div className="mt-3 text-muted-foreground text-sm">
              <div>Total Transactions: 124</div>
              <div>Failed: 4</div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title={<span className="text-sm sm:text-base">Customer Insights</span>} size="small">
            <Statistic title="Today's Customers" value={89} suffix="guests" valueStyle={{ fontSize: '24px' }} />
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
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
