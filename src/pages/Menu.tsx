import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, InputNumber, Switch, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { menuItems as initialMenuItems, categories } from '@/mocks/menu';
import { formatCurrency } from '@/utils/format';

const { Option } = Select;

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      veg: 'green',
      'non-veg': 'red',
      jain: 'cyan',
      bestseller: 'gold',
      spicy: 'volcano',
    };
    return colors[tag] || 'default';
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 80,
      render: (text: string) => <span className="text-xs font-mono">{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text: string) => <span className="text-xs sm:text-sm font-medium">{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'category',
      width: 100,
      responsive: ['md'] as any,
      render: (catId: string) => <span className="text-xs">{categories.find(c => c.id === catId)?.name || '-'}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 90,
      render: (price: number) => <span className="text-xs sm:text-sm font-semibold">{formatCurrency(price)}</span>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      responsive: ['lg'] as any,
      render: (tags: string[]) => (
        <Space wrap size={2}>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag} color={getTagColor(tag)} className="text-[10px] m-0">
              {tag.toUpperCase()}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      width: 80,
      render: (available: boolean) => (
        <Tag color={available ? 'success' : 'error'} className="text-xs">
          {available ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (item: any) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure you want to delete this menu item?',
      onOk: () => {
        setMenuItems(menuItems.filter(item => item.id !== id));
        message.success('Item deleted successfully');
      },
    });
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? { ...item, ...values } : item
      ));
      message.success('Item updated successfully');
    } else {
      const newItem = {
        ...values,
        id: `item-${Date.now()}`,
      };
      setMenuItems([...menuItems, newItem]);
      message.success('Item added successfully');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-sm text-muted-foreground">Manage menu items and pricing</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={handleAdd} className="w-full sm:w-auto">
          Add Item
        </Button>
      </div>

      <Card size="small">
        <Space direction="vertical" size="small" className="w-full mb-4">
          <Input
            placeholder="Search items..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="overflow-x-auto pb-2">
            <Space wrap={false} size="small" className="min-w-max">
              <Button 
                type={selectedCategory === 'all' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('all')}
                size="small"
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  type={selectedCategory === cat.id ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(cat.id)}
                  size="small"
                >
                  {cat.name}
                </Button>
              ))}
            </Space>
          </div>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredItems}
          rowKey="id"
          scroll={{ x: 700 }}
          pagination={{ pageSize: 15, size: 'small', showSizeChanger: false }}
          size="small"
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={window.innerWidth < 768 ? '100%' : 600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Item Name"
            rules={[{ required: true, message: 'Please enter item name' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="code"
                label="Item Code"
                rules={[{ required: true, message: 'Please enter item code' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select>
                  {categories.map(cat => (
                    <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber min={0} step={10} className="w-full" prefix="₹" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="station"
                label="Kitchen Station"
              >
                <Select>
                  <Option value="Tandoor">Tandoor</Option>
                  <Option value="Main Kitchen">Main Kitchen</Option>
                  <Option value="Fryer">Fryer</Option>
                  <Option value="Dessert">Dessert</Option>
                  <Option value="Beverage">Beverage</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tags"
            label="Tags"
            initialValue={[]}
          >
            <Select mode="multiple">
              <Option value="veg">Veg</Option>
              <Option value="non-veg">Non-Veg</Option>
              <Option value="jain">Jain</Option>
              <Option value="bestseller">Bestseller</Option>
              <Option value="spicy">Spicy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="available"
            label="Available"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Menu;
