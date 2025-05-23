import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import withAdminAuth from '../../components/hoc/withAdminAuth';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import CustomBreadcrumb from '../../components/common/Breadcrumb';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import ContentSkeleton from '../../components/common/ContentSkeleton';
import { useTheme } from '../../contexts/ThemeContext';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Giả lập loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMobileMenuClick = () => {
    setMobileMenuVisible(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar 
        collapsed={collapsed} 
        className="desktop-only"
        style={{ 
          transition: 'all 0.3s',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000
        }}
      />
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 200,
        transition: 'all 0.3s',
        background: isDarkMode ? '#141414' : '#f0f2f5'
      }}>
        <AdminHeader 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)}
          onMobileMenuClick={handleMobileMenuClick}
        />
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: isDarkMode ? '#1f1f1f' : '#fff',
          minHeight: 280,
          borderRadius: '4px',
          transition: 'all 0.3s'
        }}>
          <CustomBreadcrumb />
          <ErrorBoundary>
            {loading ? <ContentSkeleton /> : children}
          </ErrorBoundary>
        </Content>
      </Layout>
      <Drawer
        title="Menu"
        placement="left"
        onClose={handleMobileMenuClose}
        open={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
        className="mobile-only"
      >
        <AdminSidebar collapsed={false} />
      </Drawer>
    </Layout>
  );
};

export default withAdminAuth(AdminLayout); 