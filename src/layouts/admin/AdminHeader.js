import React from 'react';
import { Layout, Button, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/auth';
import ThemeSwitcher from '../../components/common/ThemeSwitcher';
import GlobalSearch from '../../components/common/GlobalSearch';
import { useTheme } from '../../contexts/ThemeContext';

const { Header } = Layout;

const AdminHeader = ({ collapsed, onToggle, onMobileMenuClick }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { isDarkMode } = useTheme();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'change-password',
      icon: <SettingOutlined />,
      label: 'Đổi mật khẩu',
      onClick: () => navigate('/change-password'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: logout,
    },
  ];

  return (
    <Header style={{ 
      padding: 0, 
      background: isDarkMode ? '#1f1f1f' : '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s'
    }}>
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{ fontSize: '16px', width: 64, height: 64 }}
          className="desktop-only"
        />
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMobileMenuClick}
          style={{ fontSize: '16px', width: 64, height: 64 }}
          className="mobile-only"
        />
      </Space>
      <Space size="large" style={{ marginRight: '24px' }}>
        <GlobalSearch />
        <ThemeSwitcher />
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
        >
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <span style={{ marginLeft: '8px' }} className="desktop-only">{user?.fullName}</span>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader; 