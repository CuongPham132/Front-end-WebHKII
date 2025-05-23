import axios from './axios';

// Đăng ký người dùng
export const register = async (email, password, fullName) => {
  const response = await axios.post('/auth/register', { email, password, fullName });
  return response.data;
};

// Đăng nhập người dùng
export const login = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    const data = response.data;
    
    // Kiểm tra và lưu token
    if (data.token) {
      localStorage.setItem('token', data.token);
    } else if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
    }

    // Kiểm tra và lưu thông tin user
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else if (data) {
      // Nếu không có trường user, lưu toàn bộ data
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Đăng xuất (xóa token và thông tin user)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login'; // Chuyển về trang login
};

// Lấy thông tin user hiện tại
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr || userStr === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Kiểm tra xem user có phải là admin không
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const getToken = () => {
  return localStorage.getItem('token');
}; 