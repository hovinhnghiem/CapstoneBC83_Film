import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4", // token Cybersoft của bạn
  },
});

// interceptor gắn accessToken của user nếu có
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const { accessToken } = JSON.parse(user);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default api;