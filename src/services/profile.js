import axios from './axios';

// Lấy thông tin hồ sơ người dùng
export const getProfile = async () => {
  const response = await axios.get('/api/user/profile');
  return response.data;
};

// Cập nhật thông tin hồ sơ người dùng
export const updateProfile = async (formData) => {
  const response = await axios.put('/api/user/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Tìm kiếm người dùng theo email hoặc tên
export const searchUsers = async (searchTerm) => {
  const response = await axios.get(`/api/user/search?searchTerm=${searchTerm}`);
  return response.data;
};

// Xem profile người dùng khác
export const getUserProfile = async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);
  return response.data;
};

// Đổi mật khẩu
export const changePassword = async (data) => {
  const response = await axios.post('/api/user/change-password', data);
  return response.data;
}; 