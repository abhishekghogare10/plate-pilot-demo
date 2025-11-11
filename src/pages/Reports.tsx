import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Badge,
  Button,
  Space,
  Table,
  DatePicker,
  Statistic,
} from 'antd';
import {
  SearchOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TeamOutlined,
  InboxOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { mockReports } from '@/mocks/reports';
import type { ReportConfig } from '@/mocks/reports';
import { formatCurrency } from '@/utils/format';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
  const [reports] = useState<ReportConfig[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categoryIcons: Record<string, any> = {
    Sales: <LineChartOutlined />,
    Operations: <ShoppingOutlined />,
    Inventory: <InboxOutlined />,
    CRM: <TeamOutlined />,
    Financial: <DollarOutlined />,
  };

  const categoryColors: Record<string, string> = {
    Sales: 'blue',
    Operations: 'orange',
    Inventory: 'green',
    CRM: 'purple',
    Financial: 'gold',
  };

  const filteredReports = reports.filter(report => {
    if (searchQuery && !report.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterCategory && report.category !== filterCategory) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(reports.map(r => r.category)));

  // Mock sample data for report view
  const sampleReportData = [
    { key: '1', item: 'Butter Chicken', orders: 245, revenue: 85750, avgPrice: 350 },
    { key: '2', item: 'Paneer Tikka', orders: 189, revenue: 56700, avgPrice: 300 },
    { key: '3', item: 'Biryani', orders: 312, revenue: 87360, avgPrice: 280 },
    { key: '4', item: 'Dal Makhani', orders: 156, revenue: 31200, avgPrice: 200 },
    { key: '5', item: 'Naan', orders: 523, revenue: 20920, avgPrice: 40 },
  ];

  const sampleReportColumns = [
    { title: 'Item Name', dataIndex: 'item', key: 'item' },
    { title: 'Orders', dataIndex: 'orders', key: 'orders', sorter: (a: any, b: any) => a.orders - b.orders },
    { 
      title: 'Revenue', 
      dataIndex: 'revenue', 
      key: 'revenue',
      render: (val: number) => formatCurrency(val),
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
    { 
      title: 'Avg Price', 
      dataIndex: 'avgPrice', 
      key: 'avgPrice',
      render: (val: number) => formatCurrency(val),
    },
  ];

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Button type="link" onClick={() => setSelectedReport(null)}>
              ← Back to Reports
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{selectedReport.name}</h1>
            <p className="text-muted-foreground">{selectedReport.description}</p>
          </div>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <Space wrap size="large">
            <RangePicker />
            <Select placeholder="Outlet" style={{ width: 150 }}>
              <Option value="all">All Outlets</Option>
              <Option value="main">Main Branch</Option>
              <Option value="airport">Airport Branch</Option>
            </Select>
            <Select placeholder="Channel" style={{ width: 150 }}>
              <Option value="all">All Channels</Option>
              <Option value="dine-in">Dine-In</Option>
              <Option value="takeaway">Takeaway</Option>
              <Option value="delivery">Delivery</Option>
            </Select>
            <Button icon={<FilterOutlined />}>More Filters</Button>
          </Space>
        </Card>

        {/* Summary Stats */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Orders" value={1425} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Revenue" value={281930} prefix="₹" precision={2} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Avg Order Value" value={197.83} prefix="₹" precision={2} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Top Item" value="Biryani" />
            </Card>
          </Col>
        </Row>

        {/* Report Data */}
        <Card title="Report Data">
          <Table
            columns={sampleReportColumns}
            dataSource={sampleReportData}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive business insights and analytics</p>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Reports" 
              value={reports.length} 
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        {categories.map(cat => (
          <Col span={6} key={cat}>
            <Card>
              <Statistic 
                title={cat}
                value={reports.filter(r => r.category === cat).length}
                prefix={categoryIcons[cat]}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Search & Filter */}
      <Card>
        <Space size="large" wrap>
          <Search
            placeholder="Search reports..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
          <Select
            placeholder="All Categories"
            style={{ width: 200 }}
            allowClear
            value={filterCategory}
            onChange={setFilterCategory}
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                <Space>
                  {categoryIcons[cat]}
                  {cat}
                </Space>
              </Option>
            ))}
          </Select>
          <Badge count={filteredReports.length} showZero>
            <Button>Reports</Button>
          </Badge>
        </Space>
      </Card>

      {/* Reports Grid */}
      <Row gutter={[16, 16]}>
        {filteredReports.map(report => (
          <Col xs={24} sm={12} lg={8} key={report.id}>
            <Card
              hoverable
              onClick={() => setSelectedReport(report)}
              className="h-full"
            >
              <Space direction="vertical" size="middle" className="w-full">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">
                    {categoryIcons[report.category]}
                  </div>
                  <Badge 
                    color={categoryColors[report.category]} 
                    text={report.category}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <Button type="primary" block icon={<BarChartOutlined />}>
                  View Report
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredReports.length === 0 && (
        <Card>
          <div className="text-center p-8 text-muted-foreground">
            <SearchOutlined style={{ fontSize: 48 }} />
            <p className="mt-4">No reports found matching your criteria</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Reports;
