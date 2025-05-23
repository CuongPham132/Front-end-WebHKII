import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { isAdmin } from '../../services/auth';

const withAdminAuth = (WrappedComponent) => {
  return function WithAdminAuthComponent(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAdminAuth = () => {
        const admin = isAdmin();
        if (!admin) {
          // Nếu không phải admin, chuyển hướng về trang chủ
          navigate('/');
        } else {
          setIsAuthorized(true);
        }
        setLoading(false);
      };

      checkAdminAuth();
    }, [navigate]);

    if (loading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <Spin size="large" tip="Đang kiểm tra quyền truy cập..." />
        </div>
      );
    }

    if (!isAuthorized) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
          }
        />
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth; 