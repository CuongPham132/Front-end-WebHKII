import axios from './axios'; // Sử dụng axios đã cấu hình interceptors

// Tạo đội nhóm mới
export const createTeam = async (teamData) => {
  const response = await axios.post('/api/teams', teamData);
  return response.data;
};

// Lấy danh sách đội nhóm của người dùng
export const getTeams = async () => {
  const response = await axios.get('/api/teams');
  return response.data;
};

// Lấy thông tin đội nhóm theo ID
export const getTeamById = async (id) => {
  try {
    console.log('Fetching team with ID:', id);
    console.log('Request URL:', `/api/teams/${id}`);
    
    // Kiểm tra token
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);
    
    const response = await axios.get(`/api/teams/${id}`);
    console.log('Team response:', response);
    console.log('Response data:', response.data);
    
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    } else {
      console.error('Unexpected response format:', response);
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

// Cập nhật thông tin đội nhóm
export const updateTeam = async (id, teamData) => {
  const response = await axios.put(`/api/teams/${id}`, teamData);
  return response.data;
};

// Xóa đội nhóm
export const deleteTeam = async (id) => {
  const response = await axios.delete(`/api/teams/${id}`);
  return response.data;
};

// Mời thành viên vào đội
export const inviteMember = async (teamId, email) => {
  const response = await axios.post(`/api/teams/${teamId}/members`, { email });
  return response.data;
};

// Lấy danh sách thành viên của đội
export const getTeamMembers = async (teamId) => {
  try {
    console.log('Fetching members for team:', teamId);
    const response = await axios.get(`/api/teams/${teamId}/members`);
    console.log('Team members response:', response.data);
    
    // Lấy thông tin team để kiểm tra creator_id
    const teamResponse = await axios.get(`/api/teams/${teamId}`);
    const team = teamResponse.data;
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    // Xử lý và format dữ liệu thành viên
    const members = Array.isArray(response.data) ? response.data : 
                   (response.data?.data ? response.data.data : []);
    
    return members.map(member => ({
      ...member,
      canRemove: currentUser?.id === team.creator_id, // Chỉ người tạo mới có quyền xóa
      roleText: getRoleText(member.role) // Chuyển đổi role thành text dễ đọc
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Hàm helper để chuyển đổi role thành text
const getRoleText = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'Quản trị viên';
    case 'member':
      return 'Thành viên';
    case 'owner':
      return 'Người tạo';
    default:
      return 'Thành viên';
  }
};

// Gỡ thành viên khỏi đội
export const removeMember = async (teamId, memberId) => {
  const response = await axios.delete(`/api/teams/${teamId}/members/${memberId}`);
  return response.data;
};

// Thay đổi vai trò của thành viên
export const changeMemberRole = async (teamId, memberId, role) => {
  const response = await axios.put(`/api/teams/${teamId}/members/${memberId}`, { role });
  return response.data;
};

// Lấy danh sách công việc của đội
export const getTeamTasks = async (teamId) => {
  try {
    // Sử dụng endpoint /api/tasks với query parameter teamId
    const response = await axios.get('/api/tasks', {
      params: {
        teamId: teamId
      }
    });
    console.log('Team tasks response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching team tasks:', error);
    throw error;
  }
}; 