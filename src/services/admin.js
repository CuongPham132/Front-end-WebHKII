import axios from './axios';

// Lấy danh sách người dùng
export const getUsers = async (params) => {
  const response = await axios.get('/api/admin/users', { params });
  return response.data;
};

// Tạo người dùng mới
export const createUser = async (userData) => {
  const response = await axios.post('/api/admin/users', userData);
  return response.data;
};

// Cập nhật vai trò người dùng
export const updateUserRole = async (data) => {
  const response = await axios.put('/api/admin/users', data);
  return response.data;
};

// Cập nhật trạng thái người dùng
export const updateUserStatus = async (data) => {
  const response = await axios.put('/api/admin/users/status', data);
  return response.data;
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  const response = await axios.delete('/api/admin/users', { data: { userId } });
  return response.data;
};

// Lấy danh sách log
export const getLogs = async () => {
  const response = await axios.get('/api/admin/logs');
  return response.data;
}; 