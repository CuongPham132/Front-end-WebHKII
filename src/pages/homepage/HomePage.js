import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Chào mừng đến với Task Manager</h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={112}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số nhóm"
              value={8}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Sự kiện tháng này"
              value={15}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Công việc đã hoàn thành"
              value={45}
              prefix={<CheckSquareOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Thao tác nhanh">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Button
                  type="primary"
                  icon={<CheckSquareOutlined />}
                  block
                  onClick={() => navigate('/tasks')}
                >
                  Xem công việc
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Button
                  type="primary"
                  icon={<TeamOutlined />}
                  block
                  onClick={() => navigate('/teams')}
                >
                  Xem nhóm
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Button
                  type="primary"
                  icon={<CalendarOutlined />}
                  block
                  onClick={() => navigate('/tasks/create')}
                >
                  Tạo công việc mới
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  block
                  onClick={() => navigate('/profile')}
                >
                  Xem hồ sơ
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 