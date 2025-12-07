import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Badge, Button, Space, Table, DatePicker, Statistic } from 'antd';
import { SearchOutlined, BarChartOutlined, DownloadOutlined } from '@ant-design/icons';
import { mockReports } from '@/mocks/reports';
import type { ReportConfig } from '@/mocks/reports';
import { formatCurrency } from '@/utils/format';

const { Search } = Input;
const { Option } = Select;

const Reports: React.FC = () => {
  const [reports] = useState<ReportConfig[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categoryColors: Record<string, string> = { Sales: 'blue', Operations: 'orange', Inventory: 'green', CRM: 'purple', Financial: 'gold' };

  const filteredReports = reports.filter(r => {
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterCategory && r.category !== filterCategory) return false;
    return true;
  });

  const categories = Array.from(new Set(reports.map(r => r.category)));

  if (selectedReport) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <Button type="link" onClick={() => setSelectedReport(null)} className="p-0">← Back</Button>
            <h1 className="text-xl sm:text-2xl font-bold">{selectedReport.name}</h1>
          </div>
          <Button type="primary" icon={<DownloadOutlined />} size="small">Export</Button>
        </div>
        <Row gutter={[8, 8]}>
          <Col xs={12} sm={6}><Card size="small"><Statistic title={<span className="text-xs">Orders</span>} value={1425} valueStyle={{ fontSize: '16px' }} /></Card></Col>
          <Col xs={12} sm={6}><Card size="small"><Statistic title={<span className="text-xs">Revenue</span>} value={281930} prefix="₹" valueStyle={{ fontSize: '16px' }} /></Card></Col>
          <Col xs={12} sm={6}><Card size="small"><Statistic title={<span className="text-xs">Avg Value</span>} value={197} prefix="₹" valueStyle={{ fontSize: '16px' }} /></Card></Col>
          <Col xs={12} sm={6}><Card size="small"><Statistic title={<span className="text-xs">Top Item</span>} value="Biryani" valueStyle={{ fontSize: '14px' }} /></Card></Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Business insights and analytics</p>
      </div>

      <Card size="small">
        <div className="flex flex-wrap gap-2">
          <Search placeholder="Search..." className="w-full sm:w-48" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} allowClear size="small" />
          <Select placeholder="Category" className="w-full sm:w-36" allowClear value={filterCategory} onChange={setFilterCategory} size="small">
            {categories.map(c => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </div>
      </Card>

      <Row gutter={[8, 8]}>
        {filteredReports.map(report => (
          <Col xs={24} sm={12} md={8} lg={6} key={report.id}>
            <Card hoverable onClick={() => setSelectedReport(report)} size="small">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between items-center">
                  <BarChartOutlined className="text-xl" />
                  <Badge color={categoryColors[report.category]} text={<span className="text-xs">{report.category}</span>} />
                </div>
                <h3 className="text-sm font-semibold">{report.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{report.description}</p>
                <Button type="primary" block size="small" icon={<BarChartOutlined />}>View</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reports;
