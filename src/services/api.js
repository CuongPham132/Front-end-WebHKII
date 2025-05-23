import axios from 'axios';

// Tạo instance axios với baseURL
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token vào header (nếu có)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi ở đây (ví dụ: token hết hạn, lỗi 401, ...)
    if (error.response && error.response.status === 401) {
      // Xử lý logout hoặc refresh token
      localStorage.removeItem('token');
      window.location.href = '/login'; // Chuyển về trang login
    }
    return Promise.reject(error);
  }
);

export default api; 