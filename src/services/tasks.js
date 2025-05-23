import api from './api';

// Lấy danh sách công việc cá nhân
export const getTasks = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

// Lấy chi tiết công việc theo ID
export const getTaskById = async (id) => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

// Tạo công việc mới
export const createTask = async (taskData) => {
  const response = await api.post('/api/tasks', taskData);
  return response.data;
};

// Cập nhật công việc
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/api/tasks/${id}`, taskData);
  return response.data;
};

// Xóa công việc
export const deleteTask = async (id) => {
  const response = await api.delete(`/api/tasks/${id}`);
  return response.data;
};

// Lấy danh sách công việc của một team
export const getTeamTasks = async (teamId) => {
  const response = await api.get(`/api/tasks/team/${teamId}`);
  return response.data;
};

// Lấy danh sách công việc cá nhân đã hoàn thành
export const getDoneTasks = async () => {
  const response = await api.get('/api/tasks/done');
  return response.data;
}; 