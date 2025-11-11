import React from 'react';
import { Card, Row, Col, Button, Badge, Progress, List, Tag, Divider, Space } from 'antd';
import { CheckOutlined, CrownOutlined, RocketOutlined } from '@ant-design/icons';
import { plans } from '@/mocks/plans';
import { formatCurrency } from '@/utils/format';

const Subscription: React.FC = () => {
  const currentPlan = plans.find(p => p.id === 'growth')!;
  
  const usage = {
    outlets: { current: 2, limit: currentPlan.limits.outlets },
    users: { current: 8, limit: currentPlan.limits.users },
    menuItems: { current: 342, limit: currentPlan.limits.menuItems },
    ordersThisMonth: { current: 12450, limit: currentPlan.limits.ordersPerMonth },
  };

  const getUsagePercent = (current: number, limit: number) => 
    Math.round((current / limit) * 100);

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
                  <Button type="primary" size="large" icon={<RocketOutlined />}>
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
    </div>
  );
};

export default Subscription;
