import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  CheckSquareOutlined,
  TeamOutlined as TeamIcon,
  PlusOutlined,
} from '@ant-design/icons';
import { getCurrentUser } from '../../services/auth';

const { Sider } = Layout;

const MainSidebar = () => {
  const location = useLocation();
  const user = getCurrentUser() || {};

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 'tasks',
      icon: <CheckSquareOutlined />,
      label: 'Công việc cá nhân',
      children: [
        {
          key: '/tasks',
          label: <Link to="/tasks">Danh sách công việc</Link>,
        },
        {
          key: '/tasks/create',
          label: <Link to="/tasks/create">Tạo công việc mới</Link>,
        },
      ],
    },
    {
      key: '/teams',
      icon: <TeamIcon />,
      label: <Link to="/teams">Nhóm</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Hồ sơ</Link>,
    },
  ];

  if (user.role === 'admin') {
    menuItems.push({
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Quản trị</Link>,
    });
  }

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div style={{ height: '64px', padding: '16px', textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>Task Manager</h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['tasks']}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default MainSidebar; 