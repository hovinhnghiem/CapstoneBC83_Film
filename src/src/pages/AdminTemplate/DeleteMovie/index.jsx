import { FaTrash } from "react-icons/fa";
import api from "../../../services/api";

export default function DeleteMovie({ maPhim, onDeleted }) {
  const handleDeleteMovie = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá phim này không?")) {
      try {
        await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
        alert("Xoá phim thành công!");
        if (onDeleted) onDeleted(maPhim); // callback cập nhật UI
      } catch (error) {
        console.error("Lỗi xoá phim:", error);
        alert(error?.response?.data?.content || "Xoá phim thất bại");
      }
    }
  };

  return (
    <button
      onClick={handleDeleteMovie}
      className="text-red-500 hover:text-red-700"
    >
      <FaTrash size={18} />
    </button>
  );
}
