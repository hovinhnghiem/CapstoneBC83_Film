import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const location = useLocation();

  // Chỉ redirect nếu đang cố vào /admin nhưng chưa login
  if (!isAuthenticated && location.pathname.startsWith("/admin")) {
    return <Navigate to="/login/" replace />;
  }

  return children;
}
