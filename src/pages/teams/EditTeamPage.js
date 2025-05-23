import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getTeamById, updateTeam } from '../../services/teams';

const EditTeamPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const teamData = await getTeamById(id);
      form.setFieldsValue({
        name: teamData.name,
        description: teamData.description,
      });
    } catch (error) {
      message.error('Lỗi khi tải thông tin đội nhóm: ' + error.message);
      navigate('/teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      if (values.avatar?.[0]?.originFileObj) {
        formData.append('avatar', values.avatar[0].originFileObj);
      }

      await updateTeam(id, formData);
      message.success('Cập nhật đội nhóm thành công!');
      navigate(`/teams/${id}`);
    } catch (error) {
      message.error('Lỗi khi cập nhật đội nhóm: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Chỉnh sửa đội nhóm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Tên đội nhóm"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đội nhóm!' },
              { min: 3, message: 'Tên đội nhóm phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên đội nhóm" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả!' }
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả đội nhóm" />
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
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => navigate(`/teams/${id}`)}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditTeamPage; 