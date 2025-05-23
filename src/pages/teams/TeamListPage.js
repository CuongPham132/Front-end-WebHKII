import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, List, Avatar, Space, message, Pagination } from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { getTeams } from '../../services/teams';

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  const fetchTeams = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await getTeams(page, limit);
      setTeams(response.items);
      setPagination({
        current: response.currentPage,
        pageSize: limit,
        total: response.totalItems
      });
    } catch (error) {
      message.error('Lỗi khi tải danh sách đội nhóm: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handlePageChange = (page, pageSize) => {
    fetchTeams(page, pageSize);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Danh sách đội nhóm"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/teams/create')}
          >
            Tạo đội nhóm mới
          </Button>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={teams}
          renderItem={(team) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => navigate(`/teams/${team.id}`)}>
                  Chi tiết
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={team.avatar_url}
                    icon={<TeamOutlined />}
                  />
                }
                title={team.name}
                description={
                  <Space direction="vertical">
                    <span>{team.description}</span>
                    <span>Người tạo: {team.creator_name}</span>
                    <span>Ngày tạo: {new Date(team.created_at).toLocaleDateString()}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total) => `Tổng số ${total} đội nhóm`}
          />
        </div>
      </Card>
    </div>
  );
};

export default TeamListPage; 