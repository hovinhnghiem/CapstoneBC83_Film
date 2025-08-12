// AdminTemplate/EditUser/index.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { useSelector } from "react-redux"; // 1. Import useSelector để lấy user từ store

// Schema để xác thực dữ liệu form
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

export default function EditUser() {
  const { taiKhoan } = useParams();
  const navigate = useNavigate();
  
  // 2. Lấy thông tin người dùng đang đăng nhập từ Redux store
  const { user: adminUser } = useSelector((state) => state.authSlice);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Lấy thông tin user cần sửa khi component được mount
  useEffect(() => {
    if (taiKhoan) {
      const fetchUser = async () => {
        try {
          const res = await api.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
          const data = res.data.content;
          
          setValue("taiKhoan", data.taiKhoan);
          setValue("matKhau", data.matKhau);
          setValue("hoTen", data.hoTen);
          setValue("email", data.email);
          setValue("soDT", data.soDT);
          setValue("maLoaiNguoiDung", data.maLoaiNguoiDung);
          setValue("maNhom", "GP00");
        } catch (err) {
          console.error("Lỗi lấy thông tin người dùng:", err);
          alert("Không thể lấy thông tin người dùng!");
        }
      };
      fetchUser();
    }
  }, [taiKhoan, setValue]);

  // Hàm xử lý khi submit form
  const onSubmit = async (values) => {
    // 3. Kiểm tra quyền của admin trước khi gửi yêu cầu
    if (adminUser?.maLoaiNguoiDung !== "QuanTri") {
      alert("Bạn không có quyền thực hiện hành động này!");
      return; // Dừng hàm nếu không có quyền
    }

    try {
      const payload = { ...values, maNhom: "GP00" };
      

      await api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
      
      alert("Cập nhật thành công!");
      navigate("/admin/user-management");
    } catch (err) {
      console.error("Lỗi cập nhật:", err.response?.data || err);
      const errorMessage = err.response?.data?.content || 'Lỗi không xác định';
      alert(`Cập nhật thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Edit User: {taiKhoan}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Tài khoản</label>
          <input
            type="text"
            disabled
            {...register("taiKhoan")}
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
          <input
            type="password"
            {...register("matKhau")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.matKhau && <p className="text-red-500 text-xs mt-1">{errors.matKhau.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Họ tên</label>
          <input
            type="text"
            {...register("hoTen")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.hoTen && <p className="text-red-500 text-xs mt-1">{errors.hoTen.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
          <input
            type="text"
            {...register("soDT")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.soDT && <p className="text-red-500 text-xs mt-1">{errors.soDT.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Loại người dùng</label>
          <select
            {...register("maLoaiNguoiDung")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Chọn loại người dùng</option>
            <option value="QuanTri">Quản Trị</option>
            <option value="KhachHang">Khách Hàng</option>
          </select>
          {errors.maLoaiNguoiDung && <p className="text-red-500 text-xs mt-1">{errors.maLoaiNguoiDung.message}</p>}
        </div>
        
        <input type="hidden" {...register("maNhom")} />

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
