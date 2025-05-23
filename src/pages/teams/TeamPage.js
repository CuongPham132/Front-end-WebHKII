import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import axios from '../../services/axios';
import { useNavigate } from 'react-router-dom';

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      const responseData = response.data;
      
      // Lấy mảng nhóm từ trường 'items'
      const teamsArray = Array.isArray(responseData.items) ? responseData.items : [];

      if (Array.isArray(teamsArray)) {
        setTeams(teamsArray);
      } else {
        console.error('API did not return a valid array for teams in items field:', responseData);
        setTeams([]);
        message.error('Received invalid data format for teams from API.');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      message.error('Không thể tải danh sách nhóm: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (values) => {
    try {
      await axios.post('/api/teams', values);
      message.success('Tạo nhóm thành công');
      setModalVisible(false);
      form.resetFields();
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      message.error('Lỗi khi tạo nhóm: ' + (error.response?.data?.message || error.message));
    }
  };

  const columns = [
    {
      title: 'Tên nhóm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => navigate(`/teams/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Số thành viên',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count) => count || 0,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {/* Thêm các nút thao tác như Xem chi tiết, Sửa, Xóa nếu cần */}
          {/* Ví dụ: <Button onClick={() => navigate(`/teams/${record.id}`)}>Xem</Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Danh sách nhóm của tôi"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Tạo nhóm mới
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={teams}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Tạo nhóm mới"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTeam}
        >
          <Form.Item
            name="name"
            label="Tên nhóm"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo nhóm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamPage; 