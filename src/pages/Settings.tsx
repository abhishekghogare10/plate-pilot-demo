import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Space,
  Upload,
  Select,
  Switch,
  Row,
  Col,
  Divider,
  Table,
  Tag,
  Modal,
  InputNumber,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  SettingOutlined,
  ShopOutlined,
  PrinterOutlined,
  LinkOutlined,
  UserOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useTenant } from '@/context/TenantContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/format';

const { TabPane } = Tabs;
const { Option } = Select;

const Settings: React.FC = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [form] = Form.useForm();

  const mockUsers = [
    { id: 'u1', name: 'Admin User', email: 'admin@spicegarden.com', role: 'Admin', status: 'Active' },
    { id: 'u2', name: 'Manager', email: 'manager@spicegarden.com', role: 'Manager', status: 'Active' },
    { id: 'u3', name: 'Cashier 1', email: 'cashier1@spicegarden.com', role: 'Cashier', status: 'Active' },
    { id: 'u4', name: 'Chef', email: 'chef@spicegarden.com', role: 'Chef', status: 'Active' },
  ];

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">Edit</Button>
          <Button type="link" size="small" danger>Deactivate</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your restaurant and system settings</p>
      </div>

      <Card>
        <Tabs defaultActiveKey="tenant">
          {/* Tenant Profile */}
          <TabPane 
            tab={
              <span>
                <ShopOutlined />
                Business Profile
              </span>
            } 
            key="tenant"
          >
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Business Name" initialValue={currentTenant?.name}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="GSTIN" initialValue={currentTenant?.gstin}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Currency" initialValue={currentTenant?.currency}>
                    <Select>
                      <Option value="INR">INR - Indian Rupee</Option>
                      <Option value="USD">USD - US Dollar</Option>
                      <Option value="EUR">EUR - Euro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Timezone" initialValue={currentTenant?.timezone}>
                    <Select>
                      <Option value="Asia/Kolkata">Asia/Kolkata</Option>
                      <Option value="Asia/Dubai">Asia/Dubai</Option>
                      <Option value="America/New_York">America/New_York</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Business Logo">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
              </Form.Item>
              <Divider />
              <h3 className="font-semibold mb-4">Outlets</h3>
              {currentTenant?.outlets.map(outlet => (
                <Card key={outlet.id} size="small" className="mb-3">
                  <Form layout="vertical">
                    <Form.Item label="Outlet Name" initialValue={outlet.name}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Address" initialValue={outlet.address}>
                      <Input.TextArea rows={2} />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Phone" initialValue={outlet.phone}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Email" initialValue={outlet.email}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              ))}
              <Button icon={<PlusOutlined />} className="mb-4">Add Outlet</Button>
              <Divider />
              <Button type="primary">Save Changes</Button>
            </Form>
          </TabPane>

          {/* Users & Roles */}
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Users & Roles
              </span>
            } 
            key="users"
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setUserModalVisible(true)}
                >
                  Invite User
                </Button>
              </div>
              <Table
                columns={userColumns}
                dataSource={mockUsers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </TabPane>

          {/* Tax Settings */}
          <TabPane 
            tab={
              <span>
                <DollarOutlined />
                Tax & Charges
              </span>
            } 
            key="tax"
          >
            <Form layout="vertical">
              <h3 className="font-semibold mb-4">Tax Configuration</h3>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="CGST (%)" initialValue={9}>
                    <InputNumber style={{ width: '100%' }} min={0} max={100} precision={2} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="SGST (%)" initialValue={9}>
                    <InputNumber style={{ width: '100%' }} min={0} max={100} precision={2} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Service Charge (%)" initialValue={10}>
                    <InputNumber style={{ width: '100%' }} min={0} max={100} precision={2} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Apply Service Charge" valuePropName="checked" initialValue={true}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <h3 className="font-semibold mb-4">Rounding</h3>
              <Form.Item label="Round Off Bill Amount" valuePropName="checked" initialValue={true}>
                <Switch />
              </Form.Item>
              <Divider />
              <Button type="primary">Save Tax Settings</Button>
            </Form>
          </TabPane>

          {/* KOT & Printers */}
          <TabPane 
            tab={
              <span>
                <PrinterOutlined />
                KOT & Printers
              </span>
            } 
            key="kot"
          >
            <Form layout="vertical">
              <h3 className="font-semibold mb-4">Kitchen Stations</h3>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card size="small">
                  <Row gutter={16} align="middle">
                    <Col span={8}>
                      <Form.Item label="Station Name" className="mb-0">
                        <Input defaultValue="Tandoor" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Printer" className="mb-0">
                        <Select defaultValue="printer1">
                          <Option value="printer1">Kitchen Printer 1</Option>
                          <Option value="printer2">Kitchen Printer 2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Button danger>Remove</Button>
                    </Col>
                  </Row>
                </Card>
                <Card size="small">
                  <Row gutter={16} align="middle">
                    <Col span={8}>
                      <Form.Item label="Station Name" className="mb-0">
                        <Input defaultValue="Grill" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Printer" className="mb-0">
                        <Select defaultValue="printer2">
                          <Option value="printer1">Kitchen Printer 1</Option>
                          <Option value="printer2">Kitchen Printer 2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Button danger>Remove</Button>
                    </Col>
                  </Row>
                </Card>
              </Space>
              <Button icon={<PlusOutlined />} className="mt-4">Add Station</Button>
              <Divider />
              <h3 className="font-semibold mb-4">Receipt Printer</h3>
              <Form.Item label="Receipt Printer">
                <Select defaultValue="receipt1">
                  <Option value="receipt1">Counter Printer</Option>
                  <Option value="receipt2">Backup Printer</Option>
                </Select>
              </Form.Item>
              <Divider />
              <Button type="primary">Save Printer Settings</Button>
            </Form>
          </TabPane>

          {/* Integrations */}
          <TabPane 
            tab={
              <span>
                <LinkOutlined />
                Integrations
              </span>
            } 
            key="integrations"
          >
            <div className="space-y-4">
              <Card title="WhatsApp Business API">
                <p className="text-muted-foreground mb-4">
                  Send order updates and marketing campaigns via WhatsApp
                </p>
                <Space>
                  <Button type="primary">Connect WhatsApp</Button>
                  <Tag color="default">Not Connected</Tag>
                </Space>
              </Card>

              <Card title="Tally Integration">
                <p className="text-muted-foreground mb-4">
                  Sync invoices and accounting data with Tally
                </p>
                <Space>
                  <Button type="primary">Connect Tally</Button>
                  <Tag color="default">Not Connected</Tag>
                </Space>
              </Card>

              <Card title="Payment Gateway">
                <p className="text-muted-foreground mb-4">
                  Accept online payments via UPI, cards, and wallets
                </p>
                <Space>
                  <Button type="primary">Configure Gateway</Button>
                  <Tag color="success">Connected</Tag>
                </Space>
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Invite User Modal */}
      <Modal
        title="Invite User"
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Cashier">Cashier</Option>
              <Option value="Chef">Chef</Option>
              <Option value="Waiter">Waiter</Option>
              <Option value="Accountant">Accountant</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Send Invitation</Button>
              <Button onClick={() => setUserModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
