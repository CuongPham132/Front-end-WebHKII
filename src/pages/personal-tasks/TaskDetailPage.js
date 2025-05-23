import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Popconfirm, Select, DatePicker, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getTaskById, updateTask, deleteTask } from '../../services/tasks';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(id);
      setTask(data);
      form.setFieldsValue({
        ...data,
        start_time: moment(data.start_time),
        end_time: moment(data.end_time)
      });
    } catch (error) {
      message.error('Lỗi khi tải thông tin công việc: ' + error.message);
      navigate('/personal-tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      await updateTask(id, {
        ...values,
        start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
        end_time: values.end_time.format('YYYY-MM-DD HH:mm:ss')
      });
      message.success('Cập nhật công việc thành công!');
      fetchTask();
    } catch (error) {
      message.error('Lỗi khi cập nhật công việc: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      message.success('Xóa công việc thành công!');
      navigate('/personal-tasks');
    } catch (error) {
      message.error('Lỗi khi xóa công việc: ' + error.message);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Chi tiết công việc"
        extra={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/personal-tasks')}
            >
              Quay lại
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xóa công việc này?"
              onConfirm={handleDelete}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={task}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value="todo">Chưa thực hiện</Option>
              <Option value="in_progress">Đang thực hiện</Option>
              <Option value="completed">Hoàn thành</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
          >
            <Select>
              <Option value="low">Thấp</Option>
              <Option value="medium">Trung bình</Option>
              <Option value="high">Cao</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="start_time"
            label="Thời gian bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            name="end_time"
            label="Thời gian kết thúc"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TaskDetailPage; 