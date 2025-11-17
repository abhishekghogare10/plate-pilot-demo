import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, InputNumber, Switch, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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

  const columns: ColumnsType<any> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'category',
      width: 150,
      responsive: ['lg'],
      render: (catId: string) => categories.find(c => c.id === catId)?.name || '-',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 250,
      responsive: ['lg'],
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag key={tag} color={getTagColor(tag)} className="mb-1">
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
      width: 120,
      responsive: ['xl'],
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      width: 100,
      responsive: ['md'],
      render: (available: boolean) => (
        <Tag color={available ? 'success' : 'error'}>
          {available ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">Manage your menu items, categories, and pricing</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAdd}>
          Add Item
        </Button>
      </div>

      <Card>
        <Space direction="vertical" size="middle" className="w-full mb-4">
          <Input
            size="large"
            placeholder="Search items..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Space wrap>
            <Button 
              type={selectedCategory === 'all' ? 'primary' : 'default'}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                type={selectedCategory === cat.id ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredItems}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
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
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Item Code"
            rules={[{ required: true, message: 'Please enter item code' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select size="large">
              {categories.map(cat => (
                <Option key={cat.id} value={cat.id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber size="large" min={0} step={10} className="w-full" prefix="₹" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
            initialValue={[]}
          >
            <Select mode="multiple" size="large">
              <Option value="veg">Veg</Option>
              <Option value="non-veg">Non-Veg</Option>
              <Option value="jain">Jain</Option>
              <Option value="bestseller">Bestseller</Option>
              <Option value="spicy">Spicy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="station"
            label="Kitchen Station"
          >
            <Select size="large">
              <Option value="Tandoor">Tandoor</Option>
              <Option value="Main Kitchen">Main Kitchen</Option>
              <Option value="Fryer">Fryer</Option>
              <Option value="Dessert">Dessert</Option>
              <Option value="Beverage">Beverage</Option>
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

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={3} />
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
