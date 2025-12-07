import React, { useState } from 'react';
import { Card, Row, Col, Input, Badge, Button, Tag, List, InputNumber, Modal, Select, Form, Space, Divider, message, Drawer } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined, MinusOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import { menuItems, categories } from '@/mocks/menu';
import { formatCurrency } from '@/utils/format';
import { MenuItem, OrderItem } from '@/types';

const { Option } = Select;

const POS: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(ci => ci.menuItemId === item.id);
    if (existingItem) {
      setCart(cart.map(ci => 
        ci.menuItemId === item.id 
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
      ));
    } else {
      const newItem: OrderItem = {
        id: `cart-${Date.now()}`,
        menuItemId: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const serviceCharge = subtotal * 0.10;
    const total = subtotal + tax + serviceCharge;
    return { subtotal, tax, serviceCharge, total };
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning('Cart is empty!');
      return;
    }
    setPaymentModalOpen(true);
    setCartDrawerOpen(false);
  };

  const handlePayment = () => {
    message.success('Order placed successfully! KOT sent to kitchen.');
    setCart([]);
    setPaymentModalOpen(false);
  };

  const { subtotal, tax, serviceCharge, total } = calculateTotals();

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

  // Cart Content Component (reused in both drawer and sidebar)
  const CartContent = () => (
    <>
      <div className="flex-1 overflow-auto mb-4">
        {cart.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Cart is empty. Add items to start an order.
          </div>
        ) : (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                className="!px-0"
                actions={[
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => removeFromCart(item.id)}
                  />
                ]}
              >
                <List.Item.Meta
                  title={<span className="text-sm">{item.name}</span>}
                  description={
                    <Space wrap size="small">
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      />
                      <InputNumber
                        size="small"
                        min={1}
                        value={item.quantity}
                        onChange={(val) => updateQuantity(item.id, val || 1)}
                        style={{ width: 50 }}
                      />
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      />
                      <span className="font-semibold text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (5%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Service Charge (10%):</span>
          <span>{formatCurrency(serviceCharge)}</span>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
        <Button 
          type="primary" 
          size="large" 
          className="w-full mt-4"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Proceed to Payment
        </Button>
      </div>
    </>
  );

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Badge count={cart.length}>
          <Button 
            type="primary" 
            size="large" 
            icon={<ShoppingCartOutlined />}
            onClick={() => setCartDrawerOpen(true)}
            className="shadow-lg h-14 w-14 rounded-full"
          />
        </Badge>
      </div>

      <Row gutter={[12, 12]} className="h-full">
        {/* Menu Items - Left Side */}
        <Col xs={24} lg={16} className="h-full flex flex-col">
          <Card className="flex-1 flex flex-col" styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: '12px' } }}>
            <Space direction="vertical" size="small" className="w-full mb-3">
              <Input
                size="large"
                placeholder="Search items by name or code..."
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

            <div className="flex-1 overflow-auto">
              <Row gutter={[8, 8]}>
                {filteredItems.map(item => (
                  <Col xs={12} sm={8} md={6} lg={6} xl={4} key={item.id}>
                    <Card
                      hoverable
                      className="h-full cursor-pointer"
                      onClick={() => addToCart(item)}
                      styles={{ body: { padding: 8 } }}
                      size="small"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-xs sm:text-sm line-clamp-2">{item.name}</div>
                        <div className="flex flex-wrap gap-0.5">
                          {item.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} color={getTagColor(tag)} className="text-[10px] m-0 px-1">
                              {tag.toUpperCase()}
                            </Tag>
                          ))}
                        </div>
                        <div className="font-bold text-primary text-sm sm:text-base">
                          {formatCurrency(item.price)}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{item.code}</div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>

        {/* Cart - Right Side (Desktop only) */}
        <Col xs={0} lg={8} className="h-full hidden lg:block">
          <Card 
            title={
              <Space>
                <ShoppingCartOutlined />
                <span>Current Order</span>
                <Badge count={cart.length} />
              </Space>
            }
            className="h-full flex flex-col"
            styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: 16 } }}
          >
            <CartContent />
          </Card>
        </Col>
      </Row>

      {/* Mobile Cart Drawer */}
      <Drawer
        title={
          <Space>
            <ShoppingCartOutlined />
            <span>Current Order</span>
            <Badge count={cart.length} />
          </Space>
        }
        placement="right"
        onClose={() => setCartDrawerOpen(false)}
        open={cartDrawerOpen}
        width="85%"
        styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
      >
        <CartContent />
      </Drawer>

      {/* Payment Modal */}
      <Modal
        title="Payment"
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        footer={null}
        width={500}
      >
        <Form layout="vertical" onFinish={handlePayment}>
          <Form.Item label="Total Amount">
            <div className="text-3xl font-bold text-primary">{formatCurrency(total)}</div>
          </Form.Item>

          <Form.Item label="Payment Method" name="paymentMethod" initialValue="upi">
            <Select size="large">
              <Option value="cash">Cash</Option>
              <Option value="card">Card</Option>
              <Option value="upi">UPI</Option>
              <Option value="wallet">Wallet</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Table (Optional)" name="table">
            <Select size="large" placeholder="Select table" allowClear>
              <Option value="T1">Table 1</Option>
              <Option value="T2">Table 2</Option>
              <Option value="T3">Table 3</Option>
              <Option value="T4">Table 4</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Customer Phone" name="phone">
            <Input size="large" placeholder="+91 " />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="w-full">
              Complete Payment & Send to Kitchen
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default POS;
