import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Table, Space, Tag, Button, message, Spin, Tabs, List, Avatar, Modal, Form, Input } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';
import { getTeamById, getTeamMembers, getTeamTasks, inviteMember, removeMember, changeMemberRole } from '../../services/teams';
import axios from '../../services/axios';
import moment from 'moment';

const { TabPane } = Tabs;

const TeamDetailPage = () => {
  const { id: teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [inviteForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMemberLoading(true);
      setTaskLoading(true);
      try {
        const teamResponse = await getTeamById(teamId);
        setTeam(teamResponse);
        
        try {
          const membersResponse = await getTeamMembers(teamId);
          console.log('Members data received:', membersResponse);
          setMembers(Array.isArray(membersResponse) ? membersResponse : []);
        } catch (memberError) {
          console.error('Error fetching team members:', memberError);
          message.error('Không thể tải danh sách thành viên: ' + (memberError.response?.data?.message || memberError.message));
          setMembers([]);
        }

        try {
          const tasksResponse = await getTeamTasks(teamId);
          setTasks(Array.isArray(tasksResponse?.items) ? tasksResponse.items : (Array.isArray(tasksResponse) ? tasksResponse : []));
        } catch (taskError) {
          console.error('Error fetching team tasks:', taskError);
          message.error('Không thể tải danh sách công việc: ' + (taskError.response?.data?.message || taskError.message));
          setTasks([]);
        }

      } catch (error) {
        console.error('Error fetching team details:', error);
        message.error('Không thể tải thông tin chi tiết nhóm: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
        setMemberLoading(false);
        setTaskLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  const handleInviteMember = async (values) => {
    try {
      await inviteMember(teamId, values.email);
      message.success('Đã gửi lời mời tham gia nhóm.');
      setInviteModalVisible(false);
      inviteForm.resetFields();
      // Refresh member list after inviting
      const membersResponse = await getTeamMembers(teamId);
      setMembers(Array.isArray(membersResponse) ? membersResponse : []);
    } catch (error) {
      console.error('Error inviting member:', error);
      message.error('Lỗi khi mời thành viên: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRemoveMember = async (memberId) => {
      try {
          await removeMember(teamId, memberId);
          message.success('Đã xóa thành viên khỏi nhóm.');
          // Refresh member list
          const membersResponse = await getTeamMembers(teamId);
          setMembers(Array.isArray(membersResponse) ? membersResponse : []);
      } catch (error) {
          console.error('Error removing member:', error);
          message.error('Lỗi khi xóa thành viên: ' + (error.response?.data?.message || error.message));
      }
  };

  const handleTaskAction = (action, task) => {
    // Placeholder for task actions (view, edit, delete)
    console.log(`${action} task:`, task);
    if (action === 'view') {
        // navigate(`/tasks/${task.id}`); // Assuming a global task detail page
        // Or open a modal for task details
    } else if (action === 'edit') {
        // Open task edit modal/page
    } else if (action === 'delete') {
        // Call delete task API
    }
  };

  const memberColumns = [
      {
          title: 'Tên thành viên',
          dataIndex: 'fullName',
          key: 'fullName',
          render: (text, record) => (
              <Space>
                  {text}
              </Space>
          )
      },
      {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
      },
      {
          title: 'Vai trò',
          dataIndex: 'role',
          key: 'role',
          render: (role) => (
              <Tag color={role === 'leader' ? 'blue' : 'green'}>
                  {role === 'leader' ? 'Trưởng nhóm' : 'Thành viên'}
              </Tag>
          )
      },
      {
          title: 'Thao tác',
          key: 'actions',
          render: (_, record) => (
              <Button danger size="small" onClick={() => handleRemoveMember(record.id)}>
                  Xóa
              </Button>
          )
      }
  ];

    const taskColumns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <a onClick={() => handleTaskAction('view', record)}>{text}</a>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'completed' ? 'success' : 'processing'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}>
                    {priority}
                </Tag>
            )
        },
        {
            title: 'Thời gian',
            key: 'time',
            render: (_, record) => (
                <span>{moment(record.start_time).format('YYYY-MM-DD HH:mm')} - {moment(record.end_time).format('YYYY-MM-DD HH:mm')}</span>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleTaskAction('edit', record)}>Sửa</Button>
                    <Button danger icon={<DeleteOutlined />} size="small" onClick={() => handleTaskAction('delete', record)}>Xóa</Button>
                </Space>
            )
        }
    ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Đang tải thông tin đội..." />
      </div>
    );
  }

  if (!team) {
      return <Card>Không tìm thấy thông tin đội.</Card>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Chi tiết đội">
          <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Tên đội">{team.name}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">{moment(team.createdAt).format('YYYY-MM-DD')}</Descriptions.Item>
              <Descriptions.Item label="Trưởng nhóm">{team.leader?.fullName || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={4}>{team.description}</Descriptions.Item>
          </Descriptions>

          <Tabs defaultActiveKey="1" style={{ marginTop: '24px' }}>
              <TabPane tab="Thành viên" key="1">
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setInviteModalVisible(true)} style={{ marginBottom: 16 }}>
                      Mời thành viên
                  </Button>
                  <Spin spinning={memberLoading}>
                    <Table
                        columns={memberColumns}
                        dataSource={members}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                    />
                  </Spin>
              </TabPane>
              <TabPane tab="Công việc" key="2">
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => handleTaskAction('create', null)} style={{ marginBottom: 16 }}>
                      Thêm công việc cho đội
                  </Button>
                  <Spin spinning={taskLoading}>
                    <Table
                        columns={taskColumns}
                        dataSource={tasks}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                    />
                  </Spin>
              </TabPane>
          </Tabs>
      </Card>

      <Modal
          title="Mời thành viên mới"
          open={inviteModalVisible}
          onCancel={() => setInviteModalVisible(false)}
          footer={null}
      >
          <Form form={inviteForm} onFinish={handleInviteMember}>
              <Form.Item
                  name="email"
                  label="Email thành viên"
                  rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' }
                  ]}
              >
                  <Input prefix={<MailOutlined />} placeholder="Nhập email" />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      Gửi lời mời
                  </Button>
              </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default TeamDetailPage; 