import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, DatePicker, Select, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../services/axios';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PersonalTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      const responseData = response.data; // Lấy dữ liệu từ response
      
      // Thử lấy mảng công việc từ trường 'personalTasks'
      const tasksArray = Array.isArray(responseData.personalTasks) ? responseData.personalTasks : [];

      if (tasksArray.length > 0 || Array.isArray(responseData.personalTasks)) {
         // Cập nhật state nếu lấy được mảng hợp lệ hoặc mảng rỗng từ trường personalTasks
        setTasks(tasksArray);
      } else {
        console.error('API did not return a valid array for tasks in personalTasks field:', responseData);
        setTasks([]); // Đảm bảo tasks là mảng rỗng nếu dữ liệu không hợp lệ
        message.error('Received invalid data format from API.');
      }

    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Không thể tải danh sách công việc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (values) => {
    try {
      const [startTime, endTime] = values.time;
      
      const taskData = {
        title: values.title,
        description: values.description,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: values.status || 'todo',
        priority: values.priority || 'medium'
      };

      if (editingTask) {
        await axios.put(`/tasks/${editingTask.id}`, taskData);
        message.success('Cập nhật công việc thành công');
      } else {
        await axios.post('/tasks', taskData);
        message.success('Tạo công việc thành công');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      ...task,
      time: [moment(task.start_time), moment(task.end_time)],
    });
    setModalVisible(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      message.success('Xóa công việc thành công');
      fetchTasks();
    } catch (error) {
      message.error('Không thể xóa công việc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'default';
      case 'in_progress':
        return 'processing';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'green';
      case 'medium':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a onClick={() => navigate(`/tasks/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'todo' ? 'Chưa thực hiện' :
           status === 'in_progress' ? 'Đang thực hiện' : 'Hoàn thành'}
        </Tag>
      ),
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'low' ? 'Thấp' :
           priority === 'medium' ? 'Trung bình' : 'Cao'}
        </Tag>
      ),
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Danh sách công việc cá nhân"
        extra={(
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/tasks/create')}
          >
            Tạo công việc mới
          </Button>
        )}
      >
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </Card>

      <Modal
        title={editingTask ? 'Sửa công việc' : 'Thêm công việc mới'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingTask(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTask}
          initialValues={{
            status: 'todo',
            priority: 'medium'
          }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề công việc" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea
              placeholder="Nhập mô tả công việc"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Thời gian"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Select.Option value="todo">Chưa thực hiện</Select.Option>
              <Select.Option value="in_progress">Đang thực hiện</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên' }]}
          >
            <Select>
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTask ? 'Cập nhật' : 'Tạo mới'}
              </Button>
              <Button onClick={() => {
                setModalVisible(false);
                setEditingTask(null);
                form.resetFields();
              }}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PersonalTaskPage; 