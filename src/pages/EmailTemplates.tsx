import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, Switch, message, Tabs, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'order' | 'booking' | 'marketing' | 'notification';
  body: string;
  variables: string[];
  active: boolean;
  createdAt: Date;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Order Confirmation',
    subject: 'Your Order #{orderNumber} is Confirmed',
    type: 'order',
    body: `Dear {customerName},\n\nThank you for your order! Your order #{orderNumber} has been confirmed.\n\nOrder Details:\n{orderDetails}\n\nTotal Amount: {totalAmount}\n\nEstimated Delivery Time: {deliveryTime}\n\nThank you for choosing us!\n\nBest regards,\n{restaurantName}`,
    variables: ['customerName', 'orderNumber', 'orderDetails', 'totalAmount', 'deliveryTime', 'restaurantName'],
    active: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Table Booking Confirmation',
    subject: 'Table Booking Confirmed - {bookingDate}',
    type: 'booking',
    body: `Dear {customerName},\n\nYour table booking has been confirmed!\n\nBooking Details:\n- Date: {bookingDate}\n- Time: {bookingTime}\n- Number of Guests: {numberOfGuests}\n- Table: {tableName}\n\nWe look forward to serving you!\n\nBest regards,\n{restaurantName}`,
    variables: ['customerName', 'bookingDate', 'bookingTime', 'numberOfGuests', 'tableName', 'restaurantName'],
    active: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Weekly Newsletter',
    subject: 'This Week\'s Special Offers!',
    type: 'marketing',
    body: `Hi {customerName},\n\nCheck out this week's special offers:\n\n{specialOffers}\n\nVisit us this week and enjoy these exclusive deals!\n\nBest regards,\n{restaurantName}`,
    variables: ['customerName', 'specialOffers', 'restaurantName'],
    active: false,
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'Order Ready Notification',
    subject: 'Your Order #{orderNumber} is Ready!',
    type: 'notification',
    body: `Dear {customerName},\n\nGreat news! Your order #{orderNumber} is ready for pickup.\n\nPlease collect it from:\n{restaurantAddress}\n\nOrder will be kept warm for the next 30 minutes.\n\nThank you!\n{restaurantName}`,
    variables: ['customerName', 'orderNumber', 'restaurantAddress', 'restaurantName'],
    active: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    name: 'Feedback Request',
    subject: 'How was your experience with us?',
    type: 'notification',
    body: `Dear {customerName},\n\nThank you for ordering from us!\n\nWe'd love to hear about your experience. Please take a moment to rate your order:\n\n{feedbackLink}\n\nYour feedback helps us serve you better!\n\nBest regards,\n{restaurantName}`,
    variables: ['customerName', 'feedbackLink', 'restaurantName'],
    active: true,
    createdAt: new Date('2024-01-12'),
  },
];

const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [form] = Form.useForm();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      order: 'blue',
      booking: 'green',
      marketing: 'purple',
      notification: 'orange',
    };
    return colors[type];
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 250,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Variables',
      dataIndex: 'variables',
      key: 'variables',
      width: 200,
      render: (variables: string[]) => (
        <div className="flex flex-wrap gap-1">
          {variables.slice(0, 3).map(v => (
            <Tag key={v} className="text-xs">{`{${v}}`}</Tag>
          ))}
          {variables.length > 3 && <Tag>+{variables.length - 3}</Tag>}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active: boolean) => (
        <Tag color={active ? 'success' : 'default'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      fixed: 'right' as const,
      render: (_: any, record: EmailTemplate) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          >
            Preview
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    form.setFieldsValue({
      ...template,
      variables: template.variables.join(', '),
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Template',
      content: 'Are you sure you want to delete this email template?',
      onOk: () => {
        setTemplates(templates.filter(t => t.id !== id));
        message.success('Template deleted successfully');
      },
    });
  };

  const handleAdd = () => {
    setEditingTemplate(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handlePreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const variables = values.variables.split(',').map((v: string) => v.trim());
      
      if (editingTemplate) {
        setTemplates(templates.map(t => 
          t.id === editingTemplate.id 
            ? { ...editingTemplate, ...values, variables }
            : t
        ));
        message.success('Template updated successfully');
      } else {
        const newTemplate: EmailTemplate = {
          id: Date.now().toString(),
          ...values,
          variables,
          createdAt: new Date(),
        };
        setTemplates([...templates, newTemplate]);
        message.success('Template created successfully');
      }
      
      setModalOpen(false);
      form.resetFields();
    });
  };

  const previewWithSampleData = (template: EmailTemplate) => {
    let preview = template.body;
    const sampleData: Record<string, string> = {
      customerName: 'John Doe',
      orderNumber: '12345',
      orderDetails: '2x Butter Chicken\n1x Garlic Naan\n1x Lassi',
      totalAmount: '₹850.00',
      deliveryTime: '30-40 minutes',
      restaurantName: 'Spice Garden Restaurant',
      bookingDate: '2024-02-15',
      bookingTime: '7:30 PM',
      numberOfGuests: '4',
      tableName: 'Table T5',
      specialOffers: '- 20% off on Biryani\n- Buy 1 Get 1 on Desserts\n- Free Delivery on orders above ₹500',
      restaurantAddress: '123 Main Street, Mumbai - 400001',
      feedbackLink: 'https://restaurant.com/feedback/12345',
    };

    template.variables.forEach(variable => {
      const regex = new RegExp(`{${variable}}`, 'g');
      preview = preview.replace(regex, sampleData[variable] || `{${variable}}`);
    });

    return preview;
  };

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.active).length,
    byType: {
      order: templates.filter(t => t.type === 'order').length,
      booking: templates.filter(t => t.type === 'booking').length,
      marketing: templates.filter(t => t.type === 'marketing').length,
      notification: templates.filter(t => t.type === 'notification').length,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Email Templates</h1>
          <p className="text-muted-foreground">Manage automated email templates</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAdd}>
          Create Template
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-muted-foreground text-sm">Total Templates</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{stats.active}</div>
              <div className="text-muted-foreground text-sm">Active</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#1890ff' }}>{stats.byType.order}</div>
              <div className="text-muted-foreground text-sm">Order Templates</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#52c41a' }}>{stats.byType.booking}</div>
              <div className="text-muted-foreground text-sm">Booking Templates</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Templates Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={templates}
          rowKey="id"
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} templates`,
          }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingTemplate ? 'Edit Template' : 'Create Template'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        width={800}
        okText="Save"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label="Template Name"
            name="name"
            rules={[{ required: true, message: 'Please enter template name' }]}
          >
            <Input placeholder="e.g., Order Confirmation" />
          </Form.Item>

          <Form.Item
            label="Email Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter email subject' }]}
          >
            <Input placeholder="e.g., Your Order #{orderNumber} is Confirmed" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Template Type"
                name="type"
                rules={[{ required: true, message: 'Please select type' }]}
              >
                <Select placeholder="Select type">
                  <Option value="order">Order</Option>
                  <Option value="booking">Booking</Option>
                  <Option value="marketing">Marketing</Option>
                  <Option value="notification">Notification</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email Body"
            name="body"
            rules={[{ required: true, message: 'Please enter email body' }]}
            extra="Use {variableName} to insert dynamic content"
          >
            <TextArea 
              rows={10} 
              placeholder="Dear {customerName},&#10;&#10;Your order has been confirmed...&#10;&#10;Best regards,&#10;{restaurantName}"
            />
          </Form.Item>

          <Form.Item
            label="Variables"
            name="variables"
            rules={[{ required: true, message: 'Please enter variables' }]}
            extra="Comma-separated list of variables (e.g., customerName, orderNumber, totalAmount)"
          >
            <Input placeholder="customerName, orderNumber, totalAmount" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title="Template Preview"
        open={previewModalOpen}
        onCancel={() => setPreviewModalOpen(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setPreviewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {previewTemplate && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Subject:</div>
              <div className="font-semibold text-base">{previewTemplate.subject}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Preview with Sample Data:</div>
              <Card className="bg-muted/30">
                <div className="whitespace-pre-wrap font-mono text-sm">
                  {previewWithSampleData(previewTemplate)}
                </div>
              </Card>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Available Variables:</div>
              <div className="flex flex-wrap gap-2">
                {previewTemplate.variables.map(v => (
                  <Tag key={v} color="blue">{`{${v}}`}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmailTemplates;
