import React, { useState } from 'react';
import {
  Card,
  Table,
  Tabs,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  DatePicker,
  Select,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd';
import {
  DollarOutlined,
  FileTextOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { mockInvoices, mockExpenses, mockTaxReports } from '@/mocks/accounting';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Accounting: React.FC = () => {
  const [invoices] = useState(mockInvoices);
  const [expenses] = useState(mockExpenses);
  const [taxReports] = useState(mockTaxReports);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [form] = Form.useForm();

  const totalSales = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalTax = invoices.reduce((sum, inv) => sum + inv.cgst + inv.sgst + inv.igst, 0);
  const netProfit = totalSales - totalExpenses - totalTax;

  const invoiceColumns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      fixed: 'left' as const,
      width: 150,
      render: (text: string) => <span className="font-mono font-semibold">{text}</span>,
    },
    {
      title: 'Order #',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      render: (text: string) => <span className="font-mono">{text}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180,
      render: (name?: string) => name || '-',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 130,
      render: (date: Date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 120,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'CGST',
      dataIndex: 'cgst',
      key: 'cgst',
      width: 100,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'SGST',
      dataIndex: 'sgst',
      key: 'sgst',
      width: 100,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 130,
      render: (amount: number) => (
        <span className="font-semibold">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config: any = {
          Paid: { color: 'success', icon: <CheckCircleOutlined /> },
          Unpaid: { color: 'warning', icon: <ClockCircleOutlined /> },
          Void: { color: 'default' },
        };
        return (
          <Tag color={config[status].color} icon={config[status].icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 100,
      render: (method?: string) => method || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small" icon={<FileTextOutlined />}>
            View
          </Button>
          <Button type="link" size="small" icon={<DownloadOutlined />}>
            PDF
          </Button>
        </Space>
      ),
    },
  ];

  const expenseColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 130,
      render: (date: Date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (amount: number) => (
        <span className="font-semibold text-red-500">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Approved By',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: () => (
        <Space>
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Edit</Button>
        </Space>
      ),
    },
  ];

  const taxReportColumns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: 150,
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalSales',
      key: 'totalSales',
      width: 150,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'CGST',
      dataIndex: 'cgst',
      key: 'cgst',
      width: 120,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'SGST',
      dataIndex: 'sgst',
      key: 'sgst',
      width: 120,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'IGST',
      dataIndex: 'igst',
      key: 'igst',
      width: 120,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Total Tax',
      dataIndex: 'totalTax',
      key: 'totalTax',
      width: 150,
      render: (amount: number) => (
        <span className="font-semibold">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small" icon={<FileTextOutlined />}>
            Details
          </Button>
          <Button type="link" size="small" icon={<DownloadOutlined />}>
            Export
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounting & GST</h1>
          <p className="text-muted-foreground">Financial reports and tax management</p>
        </div>
        <Space>
          <RangePicker />
          <Button icon={<DownloadOutlined />}>Export Report</Button>
        </Space>
      </div>

      {/* Financial Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Sales" 
              value={totalSales} 
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Expenses" 
              value={totalExpenses} 
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Tax" 
              value={totalTax} 
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Net Profit" 
              value={netProfit} 
              prefix="₹"
              precision={2}
              valueStyle={{ color: netProfit >= 0 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Card>
        <Tabs defaultActiveKey="invoices">
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                Invoices
              </span>
            } 
            key="invoices"
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <Space>
                  <Select placeholder="Filter by status" style={{ width: 150 }}>
                    <Option value="paid">Paid</Option>
                    <Option value="unpaid">Unpaid</Option>
                    <Option value="void">Void</Option>
                  </Select>
                </Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  Create Invoice
                </Button>
              </div>
              <Table
                columns={invoiceColumns}
                dataSource={invoices}
                rowKey="id"
                scroll={{ x: 1400 }}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <DollarOutlined />
                Expenses
              </span>
            } 
            key="expenses"
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <Space>
                  <Select placeholder="Filter by category" style={{ width: 200 }}>
                    <Option value="utilities">Utilities</Option>
                    <Option value="supplies">Supplies</Option>
                    <Option value="maintenance">Maintenance</Option>
                    <Option value="salary">Salary</Option>
                  </Select>
                </Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setExpenseModalVisible(true)}
                >
                  Add Expense
                </Button>
              </div>
              <Table
                columns={expenseColumns}
                dataSource={expenses}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane tab="GST Reports" key="gst">
            <div className="space-y-4">
              <Table
                columns={taxReportColumns}
                dataSource={taxReports}
                rowKey="period"
                pagination={false}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add Expense Modal */}
      <Modal
        title="Add Expense"
        open={expenseModalVisible}
        onCancel={() => setExpenseModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Select>
                  <Option value="utilities">Utilities</Option>
                  <Option value="supplies">Supplies</Option>
                  <Option value="maintenance">Maintenance</Option>
                  <Option value="salary">Salary</Option>
                  <Option value="rent">Rent</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Vendor" name="vendor" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
                <InputNumber 
                  style={{ width: '100%' }} 
                  prefix="₹"
                  precision={2}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Bill/Receipt" name="billImage">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Document</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Add Expense</Button>
              <Button onClick={() => setExpenseModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Accounting;
