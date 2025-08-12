import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { clearUser } from '../../store/auth.slice';
export default function AdminTemplate() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user')) || {};

const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin user đã lưu
    dispatch(clearUser()); // Reset Redux state
    navigate("/login"); // Điều hướng về login
  };

  return (
    <div>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#202a37] ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/admin/movies-management" className="flex items-center p-2 text-white hover:text-red-500  rounded-lg">
                Quản lý Phim
              </Link>
            </li>
            <li>
              <Link to="/admin/users-management" className="flex items-center p-2 text-white hover:text-red-500  rounded-lg">
                Quản lý người dùng
              </Link>
            </li>
            <li>
              <Link to="/admin/" className="flex items-center p-2 text-white hover:text-red-500  rounded-lg">
                Quản lý hệ thống rạp chiếu
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Top bar */}
      <div className="flex justify-end items-center px-4 py-2 sm:ml-64 bg-[#98adcb]  shadow">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <span>Chào!, {user.hoTen || 'User'}</span>
            <img
              src={user.avatar || 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png'}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button
                onClick={() => navigate('/update-info')}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                Cập nhật thông tin
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
}
