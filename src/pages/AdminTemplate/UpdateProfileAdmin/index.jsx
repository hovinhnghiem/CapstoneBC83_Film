import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.slice"; // nếu slice có action setUser để update lại store

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
  maNhom: z.string(),
});

export default function UpdateProfileAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy thông tin user từ redux
  const adminUser = useSelector(
    (state) => state.authSlice.user || state.authSlice.content
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Khi load trang -> fill dữ liệu của admin vào form
  useEffect(() => {
    if (adminUser) {
      reset({
        taiKhoan: adminUser.taiKhoan,
        matKhau: adminUser.matKhau || "",
        hoTen: adminUser.hoTen,
        email: adminUser.email,
        soDT: adminUser.soDT,
        maLoaiNguoiDung: adminUser.maLoaiNguoiDung,
        maNhom: adminUser.maNhom || "GP00",
      });
    }
  }, [adminUser, reset]);

  // Submit update
  const onSubmit = async (values) => {
    try {
      await api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
        ...values,
        maNhom: "GP00",
      });

      // Cập nhật lại redux để hiển thị thông tin mới
      dispatch(setUser(values));

      alert("Cập nhật thông tin thành công!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Lỗi cập nhật:", err.response?.data || err);
      const errorMessage = err.response?.data?.content || "Lỗi không xác định";
      alert(`Cập nhật thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Cập nhật thông tin Admin
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
            disabled
            {...register("taiKhoan")}
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
          />
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
            <p className="text-red-500 text-xs mt-1">{errors.matKhau.message}</p>
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
            disabled
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
          >
            <option value="QuanTri">Quản Trị</option>
            <option value="KhachHang">Khách Hàng</option>
          </select>
        </div>

        <input type="hidden" {...register("maNhom")} />

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
