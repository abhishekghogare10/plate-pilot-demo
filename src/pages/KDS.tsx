import React, { useState } from 'react';
import { Card, Row, Col, Tag, Button, Space, Badge, Tabs } from 'antd';
import { ClockCircleOutlined, CheckOutlined, FireOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { formatTime } from '@/utils/format';

interface KOTItem {
  id: string;
  orderNumber: string;
  items: { name: string; quantity: number; notes?: string }[];
  station: string;
  status: 'Pending' | 'In-Progress' | 'Ready';
  createdAt: Date;
  startedAt?: Date;
  table?: string;
}

const mockKOTs: KOTItem[] = [
  {
    id: 'kot-1',
    orderNumber: '#1024',
    items: [
      { name: 'Butter Chicken', quantity: 2 },
      { name: 'Paneer Tikka', quantity: 1, notes: 'Extra spicy' },
    ],
    station: 'Main Kitchen',
    status: 'Pending',
    createdAt: new Date(Date.now() - 5 * 60000),
    table: 'T2',
  },
  {
    id: 'kot-2',
    orderNumber: '#1025',
    items: [
      { name: 'Tandoori Chicken', quantity: 1 },
      { name: 'Garlic Naan', quantity: 3 },
    ],
    station: 'Tandoor',
    status: 'In-Progress',
    createdAt: new Date(Date.now() - 12 * 60000),
    startedAt: new Date(Date.now() - 8 * 60000),
    table: 'T5',
  },
  {
    id: 'kot-3',
    orderNumber: '#1023',
    items: [
      { name: 'Biryani', quantity: 2 },
    ],
    station: 'Main Kitchen',
    status: 'Ready',
    createdAt: new Date(Date.now() - 20 * 60000),
    startedAt: new Date(Date.now() - 15 * 60000),
    table: 'T7',
  },
  {
    id: 'kot-4',
    orderNumber: '#1026',
    items: [
      { name: 'Samosa', quantity: 4 },
    ],
    station: 'Fryer',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3 * 60000),
    table: 'T1',
  },
];

const KDS: React.FC = () => {
  const [kots, setKots] = useState(mockKOTs);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending': 'error',
      'In-Progress': 'warning',
      'Ready': 'success',
    };
    return colors[status];
  };

  const getElapsedTime = (createdAt: Date) => {
    const elapsed = Math.floor((Date.now() - createdAt.getTime()) / 60000);
    return `${elapsed} min ago`;
  };

  const getCardBorderColor = (kot: KOTItem) => {
    const elapsed = Math.floor((Date.now() - kot.createdAt.getTime()) / 60000);
    if (elapsed > 15) return '#ff4d4f'; // Red for > 15 min
    if (elapsed > 10) return '#faad14'; // Orange for > 10 min
    return '#52c41a'; // Green for recent
  };

  const handleStart = (id: string) => {
    setKots(kots.map(kot => 
      kot.id === id ? { ...kot, status: 'In-Progress' as const, startedAt: new Date() } : kot
    ));
  };

  const handleReady = (id: string) => {
    setKots(kots.map(kot => 
      kot.id === id ? { ...kot, status: 'Ready' as const } : kot
    ));
  };

  const stations = ['All', 'Main Kitchen', 'Tandoor', 'Fryer', 'Dessert', 'Beverage'];
  const [activeStation, setActiveStation] = useState('All');

  const filteredKots = activeStation === 'All' 
    ? kots 
    : kots.filter(kot => kot.station === activeStation);

  const tabItems = stations.map(station => {
    const count = station === 'All' 
      ? kots.length 
      : kots.filter(k => k.station === station).length;
    
    return {
      key: station,
      label: (
        <span>
          {station} <Badge count={count} style={{ backgroundColor: '#FF6B35' }} />
        </span>
      ),
      children: (
        <Row gutter={[16, 16]}>
          {(station === 'All' ? kots : kots.filter(k => k.station === station)).map(kot => (
            <Col xs={24} sm={12} lg={8} xl={6} key={kot.id}>
              <Card
                className="h-full"
                style={{ 
                  borderLeft: `6px solid ${getCardBorderColor(kot)}`,
                }}
                title={
                  <div className="flex justify-between items-center">
                    <Space>
                      <span className="font-bold">{kot.orderNumber}</span>
                      {kot.table && <Tag>{kot.table}</Tag>}
                    </Space>
                    <Tag color={getStatusColor(kot.status)}>{kot.status}</Tag>
                  </div>
                }
              >
                <Space direction="vertical" className="w-full" size="middle">
                  <div>
                    {kot.items.map((item, idx) => (
                      <div key={idx} className="mb-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">{item.name}</span>
                          <Badge count={item.quantity} style={{ backgroundColor: '#FF6B35' }} />
                        </div>
                        {item.notes && (
                          <div className="text-xs text-muted-foreground mt-1 italic">
                            Note: {item.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <ClockCircleOutlined className="mr-2" />
                    <span>{getElapsedTime(kot.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(kot.createdAt)}</span>
                  </div>

                  {kot.station && (
                    <Tag icon={<FireOutlined />} color="orange">
                      {kot.station}
                    </Tag>
                  )}

                  <div className="flex gap-2">
                    {kot.status === 'Pending' && (
                      <Button 
                        type="primary" 
                        icon={<PlayCircleOutlined />}
                        onClick={() => handleStart(kot.id)}
                        block
                      >
                        Start
                      </Button>
                    )}
                    {kot.status === 'In-Progress' && (
                      <Button 
                        type="primary" 
                        icon={<CheckOutlined />}
                        onClick={() => handleReady(kot.id)}
                        block
                        style={{ backgroundColor: '#52c41a' }}
                      >
                        Mark Ready
                      </Button>
                    )}
                    {kot.status === 'Ready' && (
                      <Button type="default" disabled block>
                        Completed
                      </Button>
                    )}
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
          {(station === 'All' ? kots : kots.filter(k => k.station === station)).length === 0 && (
            <Col span={24}>
              <Card className="text-center text-muted-foreground py-8">
                No KOTs in {station}
              </Card>
            </Col>
          )}
        </Row>
      ),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kitchen Display System</h1>
          <p className="text-muted-foreground">Manage kitchen order tickets in real-time</p>
        </div>
        <Space>
          <Badge count={kots.filter(k => k.status === 'Pending').length} offset={[-5, 5]}>
            <Card className="bg-destructive/10">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-destructive">
                  {kots.filter(k => k.status === 'Pending').length}
                </div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </Card>
          </Badge>
          <Badge count={kots.filter(k => k.status === 'In-Progress').length} offset={[-5, 5]}>
            <Card className="bg-warning/10">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-warning">
                  {kots.filter(k => k.status === 'In-Progress').length}
                </div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
            </Card>
          </Badge>
          <Badge count={kots.filter(k => k.status === 'Ready').length} offset={[-5, 5]}>
            <Card className="bg-success/10">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-success">
                  {kots.filter(k => k.status === 'Ready').length}
                </div>
                <div className="text-xs text-muted-foreground">Ready</div>
              </div>
            </Card>
          </Badge>
        </Space>
      </div>

      <Card>
        <Tabs
          activeKey={activeStation}
          onChange={setActiveStation}
          items={tabItems}
          size="large"
        />
      </Card>
    </div>
  );
};

export default KDS;
