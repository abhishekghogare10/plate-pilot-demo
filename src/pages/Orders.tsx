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
      width: 120,
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: Date) => dayjs(date).format('DD MMM YYYY HH:mm'),
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      width: 130,
      render: (channel: OrderChannel) => (
        <Space>
          <span>{channelIcons[channel]}</span>
          <span className="capitalize">{channel}</span>
        </Space>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 80,
      render: (items: any[]) => items.length,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      render: (amount: number) => (
        <span className="font-semibold">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: OrderStatus) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payments',
      key: 'payments',
      width: 100,
      render: (payments: any[]) => (
        payments.length > 0 ? (
          <Badge status="success" text="Paid" />
        ) : (
          <Badge status="warning" text="Pending" />
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 150,
      render: (_: any, record: typeof mockOrders[0]) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setDrawerVisible(true);
            }}
          >
            View
          </Button>
          <Button type="link" icon={<PrinterOutlined />}>
            Print
          </Button>
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage all orders and track status</p>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={stats.total} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Revenue" 
              value={stats.revenue} 
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Avg Order Value" 
              value={stats.avgOrder} 
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Paid Orders" value={stats.paid} suffix={`/ ${stats.total}`} />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <Space wrap size="large">
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select
            placeholder="Status"
            style={{ width: 150 }}
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
            style={{ width: 150 }}
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
            value={filters.dateRange}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
          <Button icon={<ReloadOutlined />}>Refresh</Button>
        </Space>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>

      {/* Order Details Drawer */}
      <Drawer
        title={`Order ${selectedOrder?.orderNumber}`}
        width={640}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          <Space>
            <Button icon={<PrinterOutlined />}>Print</Button>
          </Space>
        }
      >
        {selectedOrder && (
          <div className="space-y-6">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Order Number" span={2}>
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
              <Descriptions.Item label="Created At" span={2}>
                {dayjs(selectedOrder.createdAt).format('DD MMM YYYY HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <h3 className="font-semibold mb-3">Items</h3>
              <Table
                dataSource={selectedOrder.items}
                rowKey="id"
                pagination={false}
                size="small"
                columns={[
                  { title: 'Item', dataIndex: 'name', key: 'name' },
                  { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 60 },
                  { 
                    title: 'Price', 
                    dataIndex: 'price', 
                    key: 'price',
                    width: 100,
                    render: (price: number) => formatCurrency(price),
                  },
                  { 
                    title: 'Total', 
                    key: 'total',
                    width: 120,
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
                <h3 className="font-semibold mb-3">Payment Details</h3>
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
