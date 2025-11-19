import React, { useState } from 'react';
import {
  Card,
  Table,
  Tabs,
  Button,
  Space,
  Tag,
  Progress,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { mockInventoryItems, mockSuppliers, mockPurchaseOrders } from '@/mocks/inventory';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';

const { Option } = Select;
const { TabPane } = Tabs;

const Inventory: React.FC = () => {
  const [items] = useState(mockInventoryItems);
  const [suppliers] = useState(mockSuppliers);
  const [purchaseOrders] = useState(mockPurchaseOrders);
  const [modalVisible, setModalVisible] = useState(false);
  const [poModalVisible, setPoModalVisible] = useState(false);
  const [form] = Form.useForm();

  const lowStockItems = items.filter(item => item.currentStock < item.minStock);
  const totalValue = items.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  const itemColumns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Current Stock',
      dataIndex: 'currentStock',
      key: 'currentStock',
      width: 120,
      render: (stock: number, record: any) => (
        <Space direction="vertical" size={0}>
          <span className={stock < record.minStock ? 'text-red-500 font-semibold' : ''}>
            {stock} {record.unit}
          </span>
          {stock < record.minStock && (
            <Tag color="red" icon={<WarningOutlined />}>Low Stock</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Min Stock',
      dataIndex: 'minStock',
      key: 'minStock',
      width: 100,
      render: (min: number, record: any) => `${min} ${record.unit}`,
    },
    {
      title: 'Stock Level',
      key: 'level',
      width: 150,
      render: (_: any, record: any) => {
        const percent = (record.currentStock / record.minStock) * 100;
        return (
          <Progress
            percent={Math.min(percent, 100)}
            status={percent < 100 ? 'exception' : 'success'}
            size="small"
          />
        );
      },
    },
    {
      title: 'Cost/Unit',
      dataIndex: 'costPerUnit',
      key: 'costPerUnit',
      width: 120,
      render: (cost: number) => formatCurrency(cost),
    },
    {
      title: 'Total Value',
      key: 'totalValue',
      width: 130,
      render: (_: any, record: any) => 
        formatCurrency(record.currentStock * record.costPerUnit),
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 180,
    },
    {
      title: 'Last Restocked',
      dataIndex: 'lastRestocked',
      key: 'lastRestocked',
      width: 130,
      render: (date: Date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small">Adjust</Button>
          <Button type="link" size="small">Reorder</Button>
        </Space>
      ),
    },
  ];

  const supplierColumns = [
    {
      title: 'Supplier Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <span>{record.phone}</span>
          <span className="text-xs text-muted-foreground">{record.email}</span>
        </Space>
      ),
    },
    {
      title: 'GSTIN',
      dataIndex: 'gstin',
      key: 'gstin',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Tag color={rating >= 4.5 ? 'green' : rating >= 4 ? 'blue' : 'orange'}>
          ⭐ {rating}
        </Tag>
      ),
    },
    {
      title: 'Lead Time',
      dataIndex: 'leadTime',
      key: 'leadTime',
      render: (days: number) => `${days} days`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">Edit</Button>
          <Button type="link" size="small">Orders</Button>
        </Space>
      ),
    },
  ];

  const poColumns = [
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
      fixed: 'left' as const,
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Supplier',
      dataIndex: 'supplierId',
      key: 'supplierId',
      render: (id: string) => {
        const supplier = suppliers.find(s => s.id === id);
        return supplier?.name;
      },
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: any[]) => items.length,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: any = {
          Draft: 'default',
          Sent: 'blue',
          Received: 'green',
          Closed: 'default',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'expectedDelivery',
      key: 'expectedDelivery',
      render: (date?: Date) => date ? dayjs(date).format('DD MMM YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">View</Button>
          {record.status === 'Draft' && (
            <Button type="link" size="small">Send</Button>
          )}
          {record.status === 'Sent' && (
            <Button type="link" size="small">Receive</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels and manage purchases</p>
        </div>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Items" value={items.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Inventory Value" 
              value={totalValue} 
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Low Stock Items" 
              value={lowStockItems.length}
              valueStyle={{ color: lowStockItems.length > 0 ? '#ff4d4f' : undefined }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Suppliers" value={suppliers.length} />
          </Card>
        </Col>
      </Row>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card>
          <Badge.Ribbon text={`${lowStockItems.length} Items`} color="red">
            <div className="p-4">
              <Space direction="vertical" size="small">
                <div className="flex items-center gap-2">
                  <WarningOutlined className="text-red-500" />
                  <span className="font-semibold">Low Stock Alert</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lowStockItems.map(item => item.name).join(', ')} need restocking
                </p>
                <Button type="primary" size="small" icon={<ShoppingCartOutlined />}>
                  Create Purchase Order
                </Button>
              </Space>
            </div>
          </Badge.Ribbon>
        </Card>
      )}

      {/* Tabs */}
      <Card>
        <Tabs defaultActiveKey="items">
          <TabPane 
            tab={
              <span>
                <InboxOutlined />
                Inventory Items
              </span>
            } 
            key="items"
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setModalVisible(true)}
                >
                  Add Item
                </Button>
              </div>
              <Table
                columns={itemColumns}
                dataSource={items}
                rowKey="id"
                scroll={{ x: 1400 }}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ShoppingCartOutlined />
                Purchase Orders
              </span>
            } 
            key="po"
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setPoModalVisible(true)}
                >
                  Create PO
                </Button>
              </div>
              <Table
                columns={poColumns}
                dataSource={purchaseOrders}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane tab="Suppliers" key="suppliers">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Supplier
                </Button>
              </div>
              <Table
                columns={supplierColumns}
                dataSource={suppliers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add Item Modal */}
      <Modal
        title="Add Inventory Item"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Item Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Select>
                  <Option value="Meat">Meat</Option>
                  <Option value="Vegetables">Vegetables</Option>
                  <Option value="Grains">Grains</Option>
                  <Option value="Oils">Oils</Option>
                  <Option value="Spices">Spices</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Unit" name="unit" rules={[{ required: true }]}>
                <Select>
                  <Option value="kg">Kilogram (kg)</Option>
                  <Option value="liter">Liter</Option>
                  <Option value="piece">Piece</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Current Stock" name="currentStock" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Min Stock" name="minStock" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Cost per Unit" name="costPerUnit" rules={[{ required: true }]}>
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  prefix="₹"
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Supplier" name="supplier" rules={[{ required: true }]}>
                <Select>
                  {suppliers.map(s => (
                    <Option key={s.id} value={s.name}>{s.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Add Item</Button>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create PO Modal */}
      <Modal
        title="Create Purchase Order"
        open={poModalVisible}
        onCancel={() => setPoModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form layout="vertical">
          <Form.Item label="Supplier" name="supplier" rules={[{ required: true }]}>
            <Select placeholder="Select supplier">
              {suppliers.map(s => (
                <Option key={s.id} value={s.id}>{s.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Expected Delivery" name="expectedDelivery">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <div className="text-sm text-muted-foreground mb-4">
            Add items to this purchase order
          </div>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Create PO</Button>
              <Button onClick={() => setPoModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
