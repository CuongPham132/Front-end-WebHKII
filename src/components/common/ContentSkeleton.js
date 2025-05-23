import React from 'react';
import { Skeleton, Card, Row, Col } from 'antd';

const ContentSkeleton = () => {
  return (
    <div>
      <Skeleton active paragraph={{ rows: 1 }} style={{ marginBottom: 24 }} />
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 24 }}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    </div>
  );
};

export default ContentSkeleton; 