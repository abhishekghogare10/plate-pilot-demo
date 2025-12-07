import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Space, Tag, Tabs } from 'antd';
import { tables as initialTables, areas } from '@/mocks/tables';
import { TableOutlined, PlusOutlined } from '@ant-design/icons';

const Tables: React.FC = () => {
  const [tables, setTables] = useState(initialTables);
  const [selectedArea, setSelectedArea] = useState(areas[0].id);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      vacant: 'success',
      occupied: 'error',
      reserved: 'warning',
      cleaning: 'default',
    };
    return colors[status];
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      vacant: '#52c41a',
      occupied: '#ff4d4f',
      reserved: '#faad14',
      cleaning: '#d9d9d9',
    };
    return colors[status];
  };

  const filteredTables = tables.filter(t => t.areaId === selectedArea);

  const tabItems = areas.map(area => ({
    key: area.id,
    label: <span className="text-xs sm:text-sm">{area.name}</span>,
    children: (
      <Row gutter={[8, 8]}>
        {filteredTables.map(table => (
          <Col xs={12} sm={8} md={6} lg={4} xl={3} key={table.id}>
            <Badge.Ribbon 
              text={<span className="text-[10px]">{table.status.toUpperCase()}</span>}
              color={getStatusBadgeColor(table.status)}
            >
              <Card
                hoverable
                className="text-center"
                size="small"
                style={{ 
                  borderColor: getStatusBadgeColor(table.status),
                  borderWidth: 2,
                }}
              >
                <div className="space-y-2">
                  <TableOutlined 
                    style={{ 
                      fontSize: 28, 
                      color: getStatusBadgeColor(table.status) 
                    }} 
                  />
                  <div>
                    <div className="font-bold text-sm sm:text-base">{table.name}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs">
                      Seats: {table.capacity}
                    </div>
                  </div>
                  {table.status === 'occupied' && (
                    <Button type="primary" size="small" block className="text-xs">
                      View
                    </Button>
                  )}
                  {table.status === 'vacant' && (
                    <Button type="default" size="small" block className="text-xs">
                      Assign
                    </Button>
                  )}
                  {table.status === 'reserved' && (
                    <Button type="default" size="small" block className="text-xs">
                      Check In
                    </Button>
                  )}
                  {table.status === 'cleaning' && (
                    <Button type="default" size="small" block disabled className="text-xs">
                      Cleaning
                    </Button>
                  )}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    ),
  }));

  const statusCounts = {
    vacant: tables.filter(t => t.status === 'vacant').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    cleaning: tables.filter(t => t.status === 'cleaning').length,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Table Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage table status</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="middle" className="w-full sm:w-auto">
          Add Table
        </Button>
      </div>

      {/* Status Cards */}
      <Row gutter={[8, 8]}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-success">{statusCounts.vacant}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Vacant</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-destructive">{statusCounts.occupied}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Occupied</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-warning">{statusCounts.reserved}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Reserved</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-muted-foreground">{statusCounts.cleaning}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Cleaning</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables Grid */}
      <Card size="small">
        <Tabs 
          activeKey={selectedArea}
          onChange={setSelectedArea}
          items={tabItems}
          size="small"
        />
      </Card>
    </div>
  );
};

export default Tables;
