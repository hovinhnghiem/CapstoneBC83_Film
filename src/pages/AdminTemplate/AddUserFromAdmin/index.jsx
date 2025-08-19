import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Schema validate
const schema = z.object({
  taiKhoan: z.string().nonempty("Vui lòng nhập tài khoản"),
  matKhau: z.string().nonempty("Vui lòng nhập mật khẩu"),
  hoTen: z.string().nonempty("Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  soDT: z.string().nonempty("Vui lòng nhập số điện thoại"),
  maLoaiNguoiDung: z.enum(["QuanTri", "KhachHang"], {
    errorMap: () => ({ message: "Vui lòng chọn loại người dùng" }),
  }),
  maNhom: z.string().default("GP00"),
});

export default function AddUserFromAdmin() {
  const navigate = useNavigate();
  const { user: adminUser } = useSelector((state) => state.authSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    // chỉ admin mới được thêm user
    if (adminUser?.maLoaiNguoiDung !== "QuanTri") {
      alert("Bạn không có quyền thêm người dùng!");
      return;
    }

    try {
      const payload = { ...values, maNhom: "GP00" };
      await api.post("/QuanLyNguoiDung/ThemNguoiDung", payload);

      alert("Thêm người dùng thành công!");
      reset(); // clear form
      navigate(""); // chuyển về trang quản lý user
    } catch (err) {
      console.error("Lỗi thêm user:", err.response?.data || err);
      const errorMessage = err.response?.data?.content || "Lỗi không xác định";
      alert(`Thêm người dùng thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white mt-30 shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4 flex justify-center">
        Thêm người dùng mới
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 mb-6 md:grid-cols-2"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tài khoản
          </label>
          <input
            type="text"
            {...register("taiKhoan")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.taiKhoan && (
            <p className="text-red-500 text-xs mt-1">
              {errors.taiKhoan.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Mật khẩu
          </label>
          <input
            type="password"
            {...register("matKhau")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.matKhau && (
            <p className="text-red-500 text-xs mt-1">
              {errors.matKhau.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Họ tên
          </label>
          <input
            type="text"
            {...register("hoTen")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.hoTen && (
            <p className="text-red-500 text-xs mt-1">{errors.hoTen.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Số điện thoại
          </label>
          <input
            type="text"
            {...register("soDT")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.soDT && (
            <p className="text-red-500 text-xs mt-1">{errors.soDT.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Loại người dùng
          </label>
          <select
            {...register("maLoaiNguoiDung")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Chọn loại người dùng</option>
            <option value="QuanTri">Quản Trị</option>
            <option value="KhachHang">Khách Hàng</option>
          </select>
          {errors.maLoaiNguoiDung && (
            <p className="text-red-500 text-xs mt-1">
              {errors.maLoaiNguoiDung.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register("maNhom")} value="GP00" />

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
}
