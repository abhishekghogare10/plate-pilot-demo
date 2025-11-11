import React from 'react';
import { Button, Card, Row, Col, Space } from 'antd';
import { 
  ShoppingCartOutlined, 
  BarChartOutlined, 
  TeamOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartOutlined style={{ fontSize: 48 }} className="text-primary" />,
      title: 'Point of Sale',
      description: 'Fast and intuitive POS with KOT management and split billing',
    },
    {
      icon: <BarChartOutlined style={{ fontSize: 48 }} className="text-primary" />,
      title: 'Advanced Reports',
      description: '80+ reports to track sales, inventory, and performance',
    },
    {
      icon: <TeamOutlined style={{ fontSize: 48 }} className="text-primary" />,
      title: 'CRM & Loyalty',
      description: 'Build customer relationships with loyalty programs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Restaurant POS</h1>
          <Space>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
            <Button type="primary" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </Space>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Complete Restaurant
          <br />
          <span className="text-primary">Management Solution</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline operations, boost efficiency, and grow your restaurant business
          with our all-in-one management platform
        </p>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            icon={<RocketOutlined />}
            onClick={() => navigate('/signup')}
          >
            Start Free Trial
          </Button>
          <Button 
            size="large"
            onClick={() => navigate('/login')}
          >
            View Demo
          </Button>
        </Space>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="text-center h-full">
                <Space direction="vertical" size="large" className="w-full">
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Our Platform?
            </h2>
            <Space direction="vertical" size="large" className="w-full">
              {[
                'Multi-outlet management',
                'Real-time inventory tracking',
                'Integrated online ordering',
                'GST compliant accounting',
                'Staff management & roles',
                '24/7 customer support',
              ].map((benefit, index) => (
                <Space key={index}>
                  <CheckCircleOutlined className="text-success text-xl" />
                  <span className="text-lg">{benefit}</span>
                </Space>
              ))}
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <Space direction="vertical" size="large" className="w-full text-center py-8">
                <SafetyOutlined style={{ fontSize: 64 }} className="text-primary" />
                <h3 className="text-2xl font-bold">Trusted by 10,000+ Restaurants</h3>
                <p className="text-muted-foreground text-lg">
                  Join thousands of successful restaurants using our platform
                  to streamline operations and increase revenue.
                </p>
              </Space>
            </Card>
          </Col>
        </Row>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white text-center">
          <Space direction="vertical" size="large" className="w-full py-8">
            <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-xl text-white/90">
              Start your 14-day free trial today. No credit card required.
            </p>
            <Button 
              type="default" 
              size="large"
              onClick={() => navigate('/signup')}
            >
              Start Free Trial
            </Button>
          </Space>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Restaurant POS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
