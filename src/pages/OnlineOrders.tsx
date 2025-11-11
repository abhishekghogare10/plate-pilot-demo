import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Switch,
  Row,
  Col,
  Statistic,
  Badge,
  Progress,
  Alert,
  Tabs,
} from 'antd';
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { formatCurrency } from '@/utils/format';

const { TabPane } = Tabs;

interface Integration {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  commission: number;
  orders: number;
  revenue: number;
}

const OnlineOrders: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'swiggy',
      name: 'Swiggy',
      logo: '🍔',
      connected: true,
      commission: 18,
      orders: 245,
      revenue: 125000,
    },
    {
      id: 'zomato',
      name: 'Zomato',
      logo: '🍕',
      connected: true,
      commission: 20,
      orders: 189,
      revenue: 98000,
    },
    {
      id: 'dunzo',
      name: 'Dunzo',
      logo: '🛵',
      connected: false,
      commission: 15,
      orders: 0,
      revenue: 0,
    },
  ]);

  const totalOrders = integrations.reduce((sum, i) => sum + i.orders, 0);
  const totalRevenue = integrations.reduce((sum, i) => sum + i.revenue, 0);
  const totalCommission = integrations.reduce((sum, i) => sum + (i.revenue * i.commission / 100), 0);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(i => 
      i.id === id ? { ...i, connected: !i.connected } : i
    ));
  };

  const integrationColumns = [
    {
      title: 'Platform',
      key: 'platform',
      width: 200,
      render: (_: any, record: Integration) => (
        <Space>
          <span style={{ fontSize: 32 }}>{record.logo}</span>
          <span className="font-semibold">{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_: any, record: Integration) => (
        record.connected ? (
          <Badge status="success" text="Connected" />
        ) : (
          <Badge status="default" text="Not Connected" />
        )
      ),
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      width: 120,
      render: (rate: number) => `${rate}%`,
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
      width: 100,
      sorter: (a: Integration, b: Integration) => a.orders - b.orders,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 150,
      render: (amount: number) => formatCurrency(amount),
      sorter: (a: Integration, b: Integration) => a.revenue - b.revenue,
    },
    {
      title: 'Commission Paid',
      key: 'commissionPaid',
      width: 150,
      render: (_: any, record: Integration) => {
        const paid = record.revenue * (record.commission / 100);
        return <span className="text-red-500">{formatCurrency(paid)}</span>;
      },
    },
    {
      title: 'Net Revenue',
      key: 'netRevenue',
      width: 150,
      render: (_: any, record: Integration) => {
        const net = record.revenue * (1 - record.commission / 100);
        return <span className="font-semibold">{formatCurrency(net)}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 200,
      render: (_: any, record: Integration) => (
        <Space>
          <Switch
            checked={record.connected}
            onChange={() => toggleConnection(record.id)}
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
          />
          <Button 
            type="link" 
            size="small" 
            icon={<SettingOutlined />}
            disabled={!record.connected}
          >
            Settings
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Online Orders</h1>
          <p className="text-muted-foreground">Manage third-party delivery integrations</p>
        </div>
        <Button type="primary" icon={<SyncOutlined />}>
          Sync All Platforms
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Connected Platforms" 
              value={integrations.filter(i => i.connected).length}
              suffix={`/ ${integrations.length}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Gross Revenue" 
              value={totalRevenue} 
              prefix="₹"
              precision={0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Commission Paid" 
              value={totalCommission} 
              prefix="₹"
              precision={0}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alert */}
      <Alert
        message="Integration Tips"
        description="Keep your menu items synced across all platforms to avoid order conflicts. Commission rates can be negotiated based on order volume."
        type="info"
        showIcon
        closable
      />

      {/* Integrations Table */}
      <Card title="Platform Integrations">
        <Table
          columns={integrationColumns}
          dataSource={integrations}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={false}
        />
      </Card>

      {/* Menu Mapping */}
      <Card>
        <Tabs defaultActiveKey="mapping">
          <TabPane 
            tab={
              <span>
                <LinkOutlined />
                Menu Mapping
              </span>
            } 
            key="mapping"
          >
            <Alert
              message="Menu Mapping"
              description="Map your internal menu items to platform-specific items to ensure accurate order processing."
              type="warning"
              showIcon
              className="mb-4"
            />
            <div className="text-center p-8 text-muted-foreground">
              <LinkOutlined style={{ fontSize: 48 }} />
              <p className="mt-4">Menu mapping configuration will be available here</p>
              <Button type="primary" className="mt-4">
                Configure Mappings
              </Button>
            </div>
          </TabPane>

          <TabPane tab="Order History" key="history">
            <div className="text-center p-8 text-muted-foreground">
              <p>Online order history will be displayed here</p>
            </div>
          </TabPane>

          <TabPane tab="Commission Settings" key="commission">
            <div className="space-y-4">
              {integrations.filter(i => i.connected).map(integration => (
                <Card key={integration.id} size="small">
                  <Row align="middle">
                    <Col span={6}>
                      <Space>
                        <span style={{ fontSize: 24 }}>{integration.logo}</span>
                        <span className="font-semibold">{integration.name}</span>
                      </Space>
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Current Rate" 
                        value={integration.commission} 
                        suffix="%" 
                        valueStyle={{ fontSize: 20 }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Commission Paid" 
                        value={integration.revenue * (integration.commission / 100)} 
                        prefix="₹"
                        precision={0}
                        valueStyle={{ color: '#ff4d4f', fontSize: 18 }}
                      />
                    </Col>
                    <Col span={6}>
                      <Progress 
                        type="dashboard" 
                        percent={integration.commission} 
                        format={percent => `${percent}%`}
                        strokeColor={{ '0%': '#108ee9', '100%': '#ff4d4f' }}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default OnlineOrders;
