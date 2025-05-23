import api from './api';

// Tạo sự kiện cá nhân
export const createPersonalEvent = async (eventData) => {
  const response = await api.post('/api/event/calendar', eventData);
  return response.data;
};

// Lấy danh sách sự kiện cá nhân
export const getPersonalEvents = async () => {
  const response = await api.get('/api/event/calendar');
  return response.data;
};

// Cập nhật sự kiện cá nhân
export const updatePersonalEvent = async (eventId, eventData) => {
  const response = await api.put(`/api/event/calendar/${eventId}/update`, eventData);
  return response.data;
};

// Hủy sự kiện cá nhân
export const cancelPersonalEvent = async (eventId) => {
  const response = await api.delete(`/api/event/calendar/${eventId}/cancel`);
  return response.data;
};

// Tạo sự kiện nhóm
export const createTeamEvent = async (eventData) => {
  const response = await api.post('/api/event/team-calendar', eventData);
  return response.data;
};

// Lấy danh sách sự kiện nhóm
export const getTeamEvents = async (teamId) => {
  const response = await api.get(`/api/event/team-calendar/${teamId}`);
  return response.data;
};

// Cập nhật sự kiện nhóm
export const updateTeamEvent = async (eventId, eventData) => {
  const response = await api.put(`/api/event/team-calendar/${eventId}/update`, eventData);
  return response.data;
};

// Hủy sự kiện nhóm
export const cancelTeamEvent = async (eventId) => {
  const response = await api.delete(`/api/event/team-calendar/${eventId}/cancel`);
  return response.data;
}; 