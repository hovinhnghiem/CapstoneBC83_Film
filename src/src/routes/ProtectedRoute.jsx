import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Lấy user từ Redux hoặc localStorage
  const user = useSelector((state) => state.authSlice.user) 
    || JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Chưa đăng nhập → về trang login
    return <Navigate to="/login" replace />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    // Không phải quản trị → về trang chủ hoặc báo lỗi
    return <Navigate to="/" replace />;
  }

  // Nếu pass hết → render nội dung
  return children;
}
