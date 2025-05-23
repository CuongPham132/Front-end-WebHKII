import api from './api';

// Lấy thống kê hiệu suất công việc theo tuần/tháng/năm
export const getMemberStatistics = async (period) => {
  const response = await api.get(`/api/statistics/member?period=${period}`);
  return response.data;
};

// Lấy số lượng người đăng ký (admin)
export const getUserRegistrationStats = async () => {
  const response = await api.get('/api/statistics/admin/users');
  return response.data;
}; 