import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  Drawer,
  Descriptions,
  Timeline,
  Badge,
  Statistic,
  Row,
  Col,
} from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  PrinterOutlined,
  ReloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { mockOrders } from '@/mocks/orders';
import { formatCurrency } from '@/utils/format';
import type { OrderStatus, OrderChannel } from '@/types';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Orders: React.FC = () => {
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: null as OrderStatus | null,
    channel: null as OrderChannel | null,
    dateRange: null as any,
  });

  const statusColors: Record<OrderStatus, string> = {
    'Placed': 'blue',
    'In-Kitchen': 'orange',
    'Ready': 'cyan',
    'Served': 'green',
    'Billed': 'purple',
    'Cancelled': 'red',
  };

  const channelIcons: Record<OrderChannel, string> = {
    'dine-in': '🍽️',
    'takeaway': '🥡',
    'delivery': '🛵',
    'online': '📱',
  };

  const filteredOrders = orders.filter(order => {
    if (filters.search && !order.orderNumber.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && order.status !== filters.status) {
      return false;
    }
    if (filters.channel && order.channel !== filters.channel) {
      return false;
    }
    return true;
  });

  const columns = [
    {
      title: 'Order #',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      fixed: 'left' as const,
      width: 100,
      render: (text: string) => <span className="font-semibold text-xs sm:text-sm">{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      responsive: ['md'] as any,
      render: (date: Date) => dayjs(date).format('DD MMM HH:mm'),
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      width: 100,
      responsive: ['sm'] as any,
      render: (channel: OrderChannel) => (
        <Space>
          <span>{channelIcons[channel]}</span>
          <span className="capitalize text-xs hidden md:inline">{channel}</span>
        </Space>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 60,
      responsive: ['lg'] as any,
      render: (items: any[]) => items.length,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (amount: number) => (
        <span className="font-semibold text-xs sm:text-sm">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: OrderStatus) => (
        <Tag color={statusColors[status]} className="text-xs">{status}</Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payments',
      key: 'payments',
      width: 80,
      responsive: ['md'] as any,
      render: (payments: any[]) => (
        payments.length > 0 ? (
          <Badge status="success" text={<span className="text-xs">Paid</span>} />
        ) : (
          <Badge status="warning" text={<span className="text-xs">Pending</span>} />
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 100,
      render: (_: any, record: typeof mockOrders[0]) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setDrawerVisible(true);
            }}
          />
          <Button type="link" size="small" icon={<PrinterOutlined />} className="hidden sm:inline-flex" />
        </Space>
      ),
    },
  ];

  const stats = {
    total: filteredOrders.length,
    revenue: filteredOrders.reduce((sum, order) => sum + order.total, 0),
    avgOrder: filteredOrders.length > 0 
      ? filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length 
      : 0,
    paid: filteredOrders.filter(o => o.payments.length > 0).length,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage all orders and track status</p>
      </div>

      {/* Stats */}
      <Row gutter={[12, 12]}>
        <Col xs={12} sm={12} md={6}>
          <Card size="small">
            <Statistic title={<span className="text-xs">Total Orders</span>} value={stats.total} valueStyle={{ fontSize: '18px' }} />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small">
            <Statistic 
              title={<span className="text-xs">Total Revenue</span>}
              value={stats.revenue} 
              prefix="₹"
              precision={0}
              valueStyle={{ fontSize: '18px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small">
            <Statistic 
              title={<span className="text-xs">Avg Order Value</span>}
              value={stats.avgOrder} 
              prefix="₹"
              precision={0}
              valueStyle={{ fontSize: '18px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small">
            <Statistic title={<span className="text-xs">Paid Orders</span>} value={stats.paid} suffix={`/ ${stats.total}`} valueStyle={{ fontSize: '18px' }} />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card size="small">
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            className="w-full sm:w-48"
            size="middle"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select
            placeholder="Status"
            className="w-full sm:w-32"
            size="middle"
            allowClear
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Option value="Placed">Placed</Option>
            <Option value="In-Kitchen">In-Kitchen</Option>
            <Option value="Ready">Ready</Option>
            <Option value="Served">Served</Option>
            <Option value="Billed">Billed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
          <Select
            placeholder="Channel"
            className="w-full sm:w-32"
            size="middle"
            allowClear
            value={filters.channel}
            onChange={(value) => setFilters({ ...filters, channel: value })}
          >
            <Option value="dine-in">Dine-In</Option>
            <Option value="takeaway">Takeaway</Option>
            <Option value="delivery">Delivery</Option>
            <Option value="online">Online</Option>
          </Select>
          <RangePicker
            className="w-full sm:w-auto"
            size="middle"
            value={filters.dateRange}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
          <Button icon={<ReloadOutlined />} size="middle">Refresh</Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card size="small">
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ pageSize: 10, showSizeChanger: false, size: 'small' }}
          size="small"
        />
      </Card>

      {/* Order Details Drawer */}
      <Drawer
        title={`Order ${selectedOrder?.orderNumber}`}
        width={window.innerWidth < 768 ? '100%' : 640}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          <Button icon={<PrinterOutlined />} size="small">Print</Button>
        }
      >
        {selectedOrder && (
          <div className="space-y-4">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Order Number">
                {selectedOrder.orderNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Channel">
                <Space>
                  <span>{channelIcons[selectedOrder.channel]}</span>
                  <span className="capitalize">{selectedOrder.channel}</span>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={statusColors[selectedOrder.status]}>
                  {selectedOrder.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(selectedOrder.createdAt).format('DD MMM YYYY HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Items</h3>
              <Table
                dataSource={selectedOrder.items}
                rowKey="id"
                pagination={false}
                size="small"
                columns={[
                  { title: 'Item', dataIndex: 'name', key: 'name' },
                  { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 50 },
                  { 
                    title: 'Price', 
                    dataIndex: 'price', 
                    key: 'price',
                    width: 80,
                    render: (price: number) => formatCurrency(price),
                  },
                  { 
                    title: 'Total', 
                    key: 'total',
                    width: 80,
                    render: (_: any, record: any) => 
                      formatCurrency(record.price * record.quantity),
                  },
                ]}
              />
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Subtotal">
                {formatCurrency(selectedOrder.subtotal)}
              </Descriptions.Item>
              <Descriptions.Item label="Tax">
                {formatCurrency(selectedOrder.tax)}
              </Descriptions.Item>
              <Descriptions.Item label="Service Charge">
                {formatCurrency(selectedOrder.serviceCharge)}
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                -{formatCurrency(selectedOrder.discount)}
              </Descriptions.Item>
              <Descriptions.Item label="Total">
                <span className="text-lg font-bold">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </Descriptions.Item>
            </Descriptions>

            {selectedOrder.payments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-sm">Payment Details</h3>
                <Timeline
                  items={selectedOrder.payments.map(payment => ({
                    children: (
                      <div>
                        <div className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.method.toUpperCase()} 
                          {payment.reference && ` - ${payment.reference}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dayjs(payment.timestamp).format('DD MMM YYYY HH:mm')}
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Orders;
