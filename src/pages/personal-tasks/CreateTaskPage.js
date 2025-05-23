import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, DatePicker, Select, message, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from '../../services/axios';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateTaskPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const [startTime, endTime] = values.time;
      
      const taskData = {
        title: values.title,
        description: values.description,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: values.status || 'todo',
        priority: values.priority || 'medium'
      };

      await axios.post('/tasks', taskData);
      message.success('Tạo công việc thành công');
      navigate('/tasks');
    } catch (error) {
      message.error('Lỗi khi tạo công việc: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Tạo công việc mới"
        extra={
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/tasks')}
          >
            Quay lại
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Tạo công việc
              </Button>
              <Button onClick={() => navigate('/tasks')}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTaskPage; 