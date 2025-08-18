import { useState, useEffect } from "react";
import api from "../../../services/api";

export default function FindUser({ onSearchResult }) {
  const [keyword, setKeyword] = useState("");

  // Hàm debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (keyword.trim() === "") return;
      searchUser(keyword);
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [keyword]);

  const searchUser = async (value) => {
    try {
      const res = await api.get(
        `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${value}`
      );
      onSearchResult(res.data.content);
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
    }
  };

  return (
    <div className="w-[70%]">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="block w-200 p-3 ps-10 text-sm border rounded-lg"
          placeholder="Nhập tài khoản hoặc tên..."
        />
      </div>
    </div>
  );
}
