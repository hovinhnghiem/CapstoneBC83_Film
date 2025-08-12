import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser, setUser } from '../../../../store/auth.slice';
import { useEffect, useState } from 'react';

export default function Header() {
  const user = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load user từ localStorage khi refresh trang
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && !user) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch, user]);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa user trong localStorage
    dispatch(clearUser()); // Xóa user trong Redux
    navigate("/login"); // Điều hướng về login
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.jpeg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Vinh Nghiem Cinema
          </span>
        </a>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 
              border border-gray-100 rounded-lg bg-gray-50 
              md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse 
              md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 
              md:dark:bg-gray-900 dark:border-gray-700">
            
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/list-movie">List Movie</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>

            {user ? (
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span className="text-gray-900 dark:text-white">
                    Chào, {user.taiKhoan}!
                  </span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                    alt="User dropdown"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cập nhật thông tin
                    </NavLink>
                    <NavLink
                      to="/ticket-management"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Quản lý vé
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
