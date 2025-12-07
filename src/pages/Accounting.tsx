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
    { title: 'Invoice #', dataIndex: 'invoiceNumber', key: 'invoiceNumber', width: 100, render: (t: string) => <span className="font-mono text-xs">{t}</span> },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName', width: 120, responsive: ['md'] as any },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 90, render: (d: Date) => dayjs(d).format('DD MMM') },
    { title: 'Total', dataIndex: 'total', key: 'total', width: 100, render: (a: number) => <span className="font-semibold text-xs">{formatCurrency(a)}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 80, render: (s: string) => <Tag color={s === 'Paid' ? 'success' : 'warning'} className="text-xs">{s}</Tag> },
    { title: 'Actions', key: 'actions', width: 80, render: () => <Button type="link" size="small" icon={<FileTextOutlined />} /> },
  ];

  const expenseColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date', width: 90, render: (d: Date) => dayjs(d).format('DD MMM') },
    { title: 'Category', dataIndex: 'category', key: 'category', width: 100 },
    { title: 'Vendor', dataIndex: 'vendor', key: 'vendor', width: 120, responsive: ['md'] as any },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 100, render: (a: number) => <span className="font-semibold text-red-500 text-xs">{formatCurrency(a)}</span> },
  ];

  const tabItems = [
    { key: 'invoices', label: <span className="text-xs sm:text-sm"><FileTextOutlined /> Invoices</span>, children: (
      <Table columns={invoiceColumns} dataSource={invoices} rowKey="id" scroll={{ x: 600 }} pagination={{ pageSize: 10, size: 'small' }} size="small" />
    )},
    { key: 'expenses', label: <span className="text-xs sm:text-sm"><DollarOutlined /> Expenses</span>, children: (
      <Table columns={expenseColumns} dataSource={expenses} rowKey="id" scroll={{ x: 500 }} pagination={{ pageSize: 10, size: 'small' }} size="small" />
    )},
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Accounting</h1>
          <p className="text-sm text-muted-foreground">Financial reports and GST</p>
        </div>
        <Button icon={<DownloadOutlined />} size="middle">Export</Button>
      </div>

      <Row gutter={[8, 8]}>
        <Col xs={12} sm={12} md={6}><Card size="small"><Statistic title={<span className="text-xs">Sales</span>} value={totalSales} prefix="₹" precision={0} valueStyle={{ fontSize: '16px', color: '#52c41a' }} /></Card></Col>
        <Col xs={12} sm={12} md={6}><Card size="small"><Statistic title={<span className="text-xs">Expenses</span>} value={totalExpenses} prefix="₹" precision={0} valueStyle={{ fontSize: '16px', color: '#ff4d4f' }} /></Card></Col>
        <Col xs={12} sm={12} md={6}><Card size="small"><Statistic title={<span className="text-xs">Tax</span>} value={totalTax} prefix="₹" precision={0} valueStyle={{ fontSize: '16px' }} /></Card></Col>
        <Col xs={12} sm={12} md={6}><Card size="small"><Statistic title={<span className="text-xs">Net Profit</span>} value={netProfit} prefix="₹" precision={0} valueStyle={{ fontSize: '16px', color: netProfit >= 0 ? '#52c41a' : '#ff4d4f' }} /></Card></Col>
      </Row>

      <Card size="small"><Tabs items={tabItems} size="small" /></Card>
    </div>
  );
};

export default Accounting;
