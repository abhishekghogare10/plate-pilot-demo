import React, { useState } from 'react';
import {
  Card,
  Table,
  Tabs,
  Button,
  Space,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Statistic,
  Rate,
  Progress,
  Badge,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  GiftOutlined,
  StarOutlined,
  MessageOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { mockCustomers, mockFeedback, mockCampaigns } from '@/mocks/crm';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CRM: React.FC = () => {
  const [customers] = useState(mockCustomers);
  const [feedback] = useState(mockFeedback);
  const [campaigns] = useState(mockCampaigns);
  const [campaignModalVisible, setCampaignModalVisible] = useState(false);
  const [form] = Form.useForm();

  const tierColors: Record<string, string> = {
    'Silver': 'default',
    'Gold': 'gold',
    'Platinum': 'purple',
  };

  const totalLTV = customers.reduce((sum, c) => sum + c.ltv, 0);
  const avgVisits = customers.reduce((sum, c) => sum + c.visits, 0) / customers.length;
  const avgNPS = feedback.reduce((sum, f) => sum + f.nps, 0) / feedback.length;

  const customerColumns: ColumnsType<any> = [
    {
      title: 'Customer',
      key: 'customer',
      width: 200,
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <span className="font-semibold">{record.name}</span>
          <Space size="small">
            <PhoneOutlined className="text-xs" />
            <span className="text-xs text-muted-foreground">{record.phone}</span>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      key: 'tier',
      width: 100,
      responsive: ['md'] as const,
      render: (tier: string) => (
        <Tag color={tierColors[tier]} icon={<CrownOutlined />}>
          {tier}
        </Tag>
      ),
    },
    {
      title: 'Visits',
      dataIndex: 'visits',
      key: 'visits',
      width: 80,
      responsive: ['lg'] as const,
      sorter: (a: any, b: any) => a.visits - b.visits,
    },
    {
      title: 'LTV',
      dataIndex: 'ltv',
      key: 'ltv',
      width: 120,
      render: (ltv: number) => (
        <span className="font-semibold">{formatCurrency(ltv)}</span>
      ),
      sorter: (a: any, b: any) => a.ltv - b.ltv,
    },
    {
      title: 'Loyalty Points',
      dataIndex: 'loyaltyPoints',
      key: 'loyaltyPoints',
      width: 130,
      responsive: ['xl'] as const,
      render: (points: number) => (
        <Space>
          <GiftOutlined className="text-primary" />
          <span>{points}</span>
        </Space>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      responsive: ['lg'] as const,
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      width: 130,
      responsive: ['md'] as const,
      render: (date?: Date) => date ? dayjs(date).format('DD MMM YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small" icon={<PhoneOutlined />}>Call</Button>
          <Button type="link" size="small" icon={<MessageOutlined />}>SMS</Button>
        </Space>
      ),
    },
  ];

  const feedbackColumns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
    },
    {
      title: 'Order',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      render: (text: string) => <span className="font-mono">{text}</span>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: 'NPS',
      dataIndex: 'nps',
      key: 'nps',
      width: 100,
      render: (nps: number) => {
        const color = nps >= 9 ? 'green' : nps >= 7 ? 'blue' : 'red';
        return <Tag color={color}>{nps}/10</Tag>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 130,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (date: Date) => dayjs(date).format('DD MMM YYYY'),
    },
  ];

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const icons: any = {
          SMS: <MessageOutlined />,
          WhatsApp: <MessageOutlined />,
          Email: <MailOutlined />,
        };
        return (
          <Tag icon={icons[type]}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const colors: any = {
          Draft: 'default',
          Scheduled: 'blue',
          Sent: 'orange',
          Completed: 'green',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Audience',
      dataIndex: 'audience',
      key: 'audience',
      width: 200,
    },
    {
      title: 'Sent',
      dataIndex: 'sentCount',
      key: 'sentCount',
      width: 80,
    },
    {
      title: 'Performance',
      key: 'performance',
      width: 200,
      render: (_: any, record: any) => {
        if (record.status !== 'Completed') return '-';
        return (
          <Space direction="vertical" size={0}>
            <div className="text-xs">
              Open: {record.openRate}% | Click: {record.clickRate}%
            </div>
            <Progress 
              percent={record.openRate} 
              size="small" 
              showInfo={false}
            />
          </Space>
        );
      },
    },
    {
      title: 'Scheduled',
      dataIndex: 'scheduledAt',
      key: 'scheduledAt',
      width: 130,
      render: (date?: Date) => date ? dayjs(date).format('DD MMM YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">View</Button>
          {record.status === 'Draft' && (
            <Button type="link" size="small">Send</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM & Loyalty</h1>
          <p className="text-muted-foreground">Manage customers and engage with campaigns</p>
        </div>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Customers" value={customers.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total LTV" 
              value={totalLTV} 
              prefix="₹"
              precision={0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Avg Visits" 
              value={avgVisits} 
              precision={1}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Avg NPS" 
              value={avgNPS} 
              precision={1}
              suffix="/ 10"
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Card>
        <Tabs defaultActiveKey="customers">
          <TabPane tab="Customers" key="customers">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Input
                  placeholder="Search customers..."
                  prefix={<SearchOutlined />}
                  style={{ width: 300 }}
                />
                <Space>
                  <Select placeholder="Filter by tier" style={{ width: 150 }}>
                    <Option value="Silver">Silver</Option>
                    <Option value="Gold">Gold</Option>
                    <Option value="Platinum">Platinum</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Customer
                  </Button>
                </Space>
              </div>
              <Table
                columns={customerColumns}
                dataSource={customers}
                rowKey="id"
                scroll={{ x: 1200 }}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane tab={
            <span>
              <StarOutlined />
              Feedback
            </span>
          } key="feedback">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Space>
                  <Select placeholder="Filter by rating" style={{ width: 150 }}>
                    <Option value="5">5 Stars</Option>
                    <Option value="4">4 Stars</Option>
                    <Option value="3">3 Stars</Option>
                    <Option value="2">2 Stars</Option>
                    <Option value="1">1 Star</Option>
                  </Select>
                  <Select placeholder="Filter by NPS" style={{ width: 150 }}>
                    <Option value="promoter">Promoter (9-10)</Option>
                    <Option value="passive">Passive (7-8)</Option>
                    <Option value="detractor">Detractor (0-6)</Option>
                  </Select>
                </Space>
              </div>
              <Table
                columns={feedbackColumns}
                dataSource={feedback}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          <TabPane tab={
            <span>
              <MessageOutlined />
              Campaigns
            </span>
          } key="campaigns">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setCampaignModalVisible(true)}
                >
                  Create Campaign
                </Button>
              </div>
              <Table
                columns={campaignColumns}
                dataSource={campaigns}
                rowKey="id"
                scroll={{ x: 1200 }}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Create Campaign Modal */}
      <Modal
        title="Create Campaign"
        open={campaignModalVisible}
        onCancel={() => setCampaignModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Campaign Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Weekend Special Offer" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select>
                  <Option value="SMS">SMS</Option>
                  <Option value="WhatsApp">WhatsApp</Option>
                  <Option value="Email">Email</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Audience" name="audience" rules={[{ required: true }]}>
                <Select>
                  <Option value="all">All Customers</Option>
                  <Option value="platinum">Platinum Members</Option>
                  <Option value="gold">Gold Members</Option>
                  <Option value="inactive">Inactive (30+ days)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Message" name="message" rules={[{ required: true }]}>
            <TextArea 
              rows={4} 
              placeholder="Enter your message here..."
              showCount
              maxLength={160}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create & Schedule
              </Button>
              <Button onClick={() => setCampaignModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CRM;
