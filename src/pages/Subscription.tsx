import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Progress, List, Tag, Divider, Space, Modal, Form, Select, Input, Radio, Spin, Result, Steps, message } from 'antd';
import { CheckOutlined, CrownOutlined, RocketOutlined, CreditCardOutlined, WalletOutlined, BankOutlined } from '@ant-design/icons';
import { plans } from '@/mocks/plans';
import { formatCurrency } from '@/utils/format';

const { Option } = Select;

const Subscription: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState(plans.find(p => p.id === 'growth')!);
  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false);
  const [selectedNewPlan, setSelectedNewPlan] = useState<typeof plans[0] | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [form] = Form.useForm();
  
  const usage = {
    outlets: { current: 2, limit: currentPlan.limits.outlets },
    users: { current: 8, limit: currentPlan.limits.users },
    menuItems: { current: 342, limit: currentPlan.limits.menuItems },
    ordersThisMonth: { current: 12450, limit: currentPlan.limits.ordersPerMonth },
  };

  const getUsagePercent = (current: number, limit: number) => 
    Math.round((current / limit) * 100);

  const handleUpgradeClick = () => {
    setChangePlanModalOpen(true);
  };

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.id === currentPlan.id) {
      message.info('This is your current plan');
      return;
    }
    setSelectedNewPlan(plan);
    setChangePlanModalOpen(false);
    setPaymentModalOpen(true);
    setPaymentStep(0);
  };

  const calculateProration = () => {
    if (!selectedNewPlan) return { amount: 0, credit: 0, total: 0 };
    const daysRemaining = 20; // Mock: 20 days left in billing cycle
    const daysInMonth = 30;
    const currentPlanDailyRate = currentPlan.price / daysInMonth;
    const newPlanDailyRate = selectedNewPlan.price / daysInMonth;
    const credit = currentPlanDailyRate * daysRemaining;
    const charge = newPlanDailyRate * daysRemaining;
    const total = charge - credit;
    return { 
      amount: selectedNewPlan.price,
      credit: Math.round(credit),
      total: Math.round(total)
    };
  };

  const handlePaymentSubmit = async () => {
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setPaymentStep(2);
      setTimeout(() => {
        if (selectedNewPlan) {
          setCurrentPlan(selectedNewPlan);
          message.success(`Successfully upgraded to ${selectedNewPlan.name} plan!`);
        }
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
        setSelectedNewPlan(null);
      }, 2000);
    }, 2000);
  };

  const proration = calculateProration();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your plan and billing</p>
      </div>

      {/* Current Plan */}
      <Card title="Current Plan">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Badge.Ribbon text="Active" color="green">
              <Card className="border-2 border-primary">
                <Space direction="vertical" size="large" className="w-full">
                  <div>
                    <div className="text-2xl font-bold">{currentPlan.name}</div>
                    <div className="text-3xl font-bold text-primary mt-2">
                      {formatCurrency(currentPlan.price)}
                      <span className="text-base text-muted-foreground">/{currentPlan.billingPeriod}</span>
                    </div>
                  </div>
                  <Button type="primary" size="large" icon={<RocketOutlined />} onClick={handleUpgradeClick}>
                    Upgrade Plan
                  </Button>
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col xs={24} md={12}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Outlets</span>
                  <span className="font-semibold">
                    {usage.outlets.current} / {usage.outlets.limit}
                  </span>
                </div>
                <Progress 
                  percent={getUsagePercent(usage.outlets.current, usage.outlets.limit)} 
                  strokeColor="#FF6B35"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Users</span>
                  <span className="font-semibold">
                    {usage.users.current} / {usage.users.limit}
                  </span>
                </div>
                <Progress 
                  percent={getUsagePercent(usage.users.current, usage.users.limit)}
                  strokeColor="#F7931E"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Menu Items</span>
                  <span className="font-semibold">
                    {usage.menuItems.current} / {usage.menuItems.limit}
                  </span>
                </div>
                <Progress 
                  percent={getUsagePercent(usage.menuItems.current, usage.menuItems.limit)}
                  strokeColor="#37B7C3"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Orders This Month</span>
                  <span className="font-semibold">
                    {usage.ordersThisMonth.current.toLocaleString()} / {usage.ordersThisMonth.limit.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  percent={getUsagePercent(usage.ordersThisMonth.current, usage.ordersThisMonth.limit)}
                  strokeColor="#52c41a"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <Row gutter={[16, 16]}>
          {plans.map(plan => (
            <Col xs={24} sm={12} lg={6} key={plan.id}>
              <Card 
                className={plan.id === currentPlan.id ? 'border-2 border-primary' : ''}
                title={
                  <div className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    {plan.id === 'enterprise' && <CrownOutlined className="text-warning" />}
                    {plan.id === currentPlan.id && <Tag color="green">Current</Tag>}
                  </div>
                }
              >
                <div className="space-y-4">
                  <div>
                    {plan.id === 'enterprise' ? (
                      <div className="text-2xl font-bold">Custom</div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">
                          {formatCurrency(plan.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">per {plan.billingPeriod}</div>
                      </>
                    )}
                  </div>

                  <Divider />

                  <List
                    size="small"
                    dataSource={plan.features}
                    renderItem={(feature) => (
                      <List.Item>
                        <Space>
                          <CheckOutlined className="text-success" />
                          <span className="text-sm">{feature}</span>
                        </Space>
                      </List.Item>
                    )}
                  />

                  <Button 
                    type={plan.id === currentPlan.id ? 'default' : 'primary'}
                    block
                    disabled={plan.id === currentPlan.id}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.id === currentPlan.id ? 'Current Plan' : 
                     plan.id === 'enterprise' ? 'Contact Sales' : 'Select Plan'}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Billing History */}
      <Card title="Recent Invoices">
        <List
          dataSource={[
            { id: 'INV-2024-001', date: '2024-01-01', amount: 9999, status: 'paid' },
            { id: 'INV-2023-012', date: '2023-12-01', amount: 9999, status: 'paid' },
            { id: 'INV-2023-011', date: '2023-11-01', amount: 9999, status: 'paid' },
          ]}
          renderItem={(invoice) => (
            <List.Item
              actions={[
                <Button type="link">Download PDF</Button>,
              ]}
            >
              <List.Item.Meta
                title={invoice.id}
                description={invoice.date}
              />
              <div className="flex items-center gap-4">
                <Tag color={invoice.status === 'paid' ? 'success' : 'warning'}>
                  {invoice.status.toUpperCase()}
                </Tag>
                <span className="font-semibold">{formatCurrency(invoice.amount)}</span>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Change Plan Modal */}
      <Modal
        title="Change Subscription Plan"
        open={changePlanModalOpen}
        onCancel={() => setChangePlanModalOpen(false)}
        footer={null}
        width={900}
      >
        <Row gutter={[16, 16]}>
          {plans.map(plan => (
            <Col xs={24} sm={12} key={plan.id}>
              <Card 
                hoverable
                className={plan.id === currentPlan.id ? 'border-2 border-primary' : ''}
                onClick={() => handleSelectPlan(plan)}
              >
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.id === 'enterprise' && <CrownOutlined className="text-warning text-xl" />}
                    {plan.id === currentPlan.id && <Tag color="green">Current</Tag>}
                  </div>
                  {plan.id === 'enterprise' ? (
                    <div className="text-2xl font-bold">Custom</div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-primary">
                        {formatCurrency(plan.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">per {plan.billingPeriod}</div>
                    </>
                  )}
                  <Divider />
                  <List
                    size="small"
                    dataSource={plan.features.slice(0, 4)}
                    renderItem={(feature) => (
                      <List.Item>
                        <Space size="small">
                          <CheckOutlined className="text-success" />
                          <span className="text-xs">{feature}</span>
                        </Space>
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>

      {/* Payment Modal */}
      <Modal
        title="Complete Payment"
        open={paymentModalOpen}
        onCancel={() => {
          setPaymentModalOpen(false);
          setPaymentStep(0);
          setPaymentSuccess(false);
        }}
        footer={null}
        width={600}
      >
        <Steps current={paymentStep} className="mb-6">
          <Steps.Step title="Review" />
          <Steps.Step title="Payment" />
          <Steps.Step title="Confirmation" />
        </Steps>

        {paymentStep === 0 && selectedNewPlan && (
          <div className="space-y-4">
            <Card size="small">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Plan:</span>
                  <span className="font-semibold">{selectedNewPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing Amount:</span>
                  <span className="font-semibold">{formatCurrency(proration.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credit from current plan:</span>
                  <span className="text-success">-{formatCurrency(proration.credit)}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total Due Today:</span>
                  <span className="font-bold text-primary">{formatCurrency(proration.total)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Prorated amount for remaining 20 days of current billing cycle. 
                  Next billing on {new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </Card>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setPaymentModalOpen(false)}>Cancel</Button>
              <Button type="primary" onClick={() => setPaymentStep(1)}>
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {paymentStep === 1 && !paymentSuccess && (
          <div className="space-y-4">
            <Card size="small" className="bg-muted">
              <div className="flex justify-between items-center">
                <span>Amount to Pay:</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(proration.total)}</span>
              </div>
            </Card>

            <Form form={form} layout="vertical" onFinish={handlePaymentSubmit}>
              <Form.Item label="Payment Method" name="paymentMethod" initialValue="card">
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                  <Space direction="vertical" className="w-full">
                    <Radio value="card">
                      <Space>
                        <CreditCardOutlined />
                        Credit / Debit Card
                      </Space>
                    </Radio>
                    <Radio value="upi">
                      <Space>
                        <WalletOutlined />
                        UPI
                      </Space>
                    </Radio>
                    <Radio value="netbanking">
                      <Space>
                        <BankOutlined />
                        Net Banking
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {paymentMethod === 'card' && (
                <>
                  <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Please enter card number' }]}>
                    <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Expiry Date" name="expiry" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="MM/YY" maxLength={5} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: 'Required' }]}>
                        <Input.Password placeholder="123" maxLength={3} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Cardholder Name" name="cardholderName" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="John Doe" />
                  </Form.Item>
                </>
              )}

              {paymentMethod === 'upi' && (
                <Form.Item label="UPI ID" name="upiId" rules={[{ required: true, message: 'Please enter UPI ID' }]}>
                  <Input placeholder="yourname@upi" />
                </Form.Item>
              )}

              {paymentMethod === 'netbanking' && (
                <Form.Item label="Select Bank" name="bank" rules={[{ required: true, message: 'Please select bank' }]}>
                  <Select placeholder="Select your bank">
                    <Option value="hdfc">HDFC Bank</Option>
                    <Option value="icici">ICICI Bank</Option>
                    <Option value="sbi">State Bank of India</Option>
                    <Option value="axis">Axis Bank</Option>
                  </Select>
                </Form.Item>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <Button onClick={() => setPaymentStep(0)} disabled={paymentProcessing}>Back</Button>
                <Button type="primary" htmlType="submit" loading={paymentProcessing}>
                  {paymentProcessing ? 'Processing...' : `Pay ${formatCurrency(proration.total)}`}
                </Button>
              </div>
            </Form>
          </div>
        )}

        {paymentStep === 2 && paymentSuccess && (
          <Result
            status="success"
            title="Payment Successful!"
            subTitle={`You have successfully upgraded to the ${selectedNewPlan?.name} plan. Your new features are now active.`}
            extra={[
              <div key="details" className="text-center">
                <p>Transaction ID: TXN{Date.now()}</p>
                <p>Amount Paid: {formatCurrency(proration.total)}</p>
              </div>
            ]}
          />
        )}
      </Modal>
    </div>
  );
};

export default Subscription;
