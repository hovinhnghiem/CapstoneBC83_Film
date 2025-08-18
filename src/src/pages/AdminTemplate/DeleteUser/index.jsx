import React from "react";
import api from "../../../services/api";

export default function DeleteUser({ taiKhoan, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản "${taiKhoan}"?`)) return;

    try {
      await api.delete(`/QuanLyNguoiDung/XoaNguoiDung`, {
        params: { TaiKhoan: taiKhoan },
      });
      alert("Xóa người dùng thành công!");
      if (onDeleted) onDeleted(taiKhoan); // callback để cập nhật lại danh sách
    } catch (error) {
      console.error("❌ Lỗi khi xóa người dùng:", error);
      alert(error?.response?.data?.content || "Xóa thất bại!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
}
