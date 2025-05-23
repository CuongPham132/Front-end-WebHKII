import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Upload, DatePicker, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../../services/profile';
import moment from 'moment';

const { TextArea } = Input;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      form.setFieldsValue({
        ...data,
        date_of_birth: data.date_of_birth ? moment(data.date_of_birth) : null
      });
    } catch (error) {
      message.error('Lỗi khi tải thông tin hồ sơ: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Thêm các trường thông tin vào formData
      Object.keys(values).forEach(key => {
        if (key === 'date_of_birth' && values[key]) {
          formData.append(key, values[key].format('YYYY-MM-DD'));
        } else if (key === 'avatar' && values[key]?.file) {
          formData.append(key, values[key].file);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      await updateProfile(formData);
      message.success('Cập nhật thông tin thành công!');
      fetchProfile();
    } catch (error) {
      message.error('Lỗi khi cập nhật thông tin: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Thông tin cá nhân">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={profile}
        >
          <Form.Item
            name="full_name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date_of_birth"
            label="Ngày sinh"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Giới thiệu"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Ảnh đại diện"
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
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

export default ProfilePage; 