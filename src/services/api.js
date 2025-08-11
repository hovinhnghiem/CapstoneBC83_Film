import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/',
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const accessToken = user ? user.accessToken : null;
  return {
    ...config,
    headers: {
      TokenCybersoft:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTIiLCJIZXRIYW5TdHJpbmciOiIyNy8wNC8yMDI2IiwiSGV0SGFuVGltZSI6IjE3NzcyNDgwMDAwMDAiLCJuYmYiOjE3NTg5MDk2MDAsImV4cCI6MTc3NzM5OTIwMH0._b9cEhCuhW5AQ7TsywHkbc2NkdJDSmQZYCxkjTSbv3I',
      Authorization: accessToken ? `Bearer ${accessToken}` : ""
    },
  };
});

export default api;
