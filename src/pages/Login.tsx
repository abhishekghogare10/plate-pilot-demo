import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Option } = Select;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await login(values.email, values.password, values.role);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <Card 
        className="w-full max-w-md shadow-xl"
        title={
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold text-primary mb-2">Restaurant POS</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
        }
      >
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="role"
            initialValue="Manager"
            label="Demo Role (for testing)"
          >
            <Select
              prefix={<SafetyOutlined />}
              placeholder="Select a role"
            >
              <Option value="SuperAdmin">Super Admin</Option>
              <Option value="Admin">Admin (Owner)</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Cashier">Cashier</Option>
              <Option value="Chef">Chef</Option>
              <Option value="Waiter">Waiter</Option>
              <Option value="Accountant">Accountant</Option>
              <Option value="Viewer">Viewer</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
