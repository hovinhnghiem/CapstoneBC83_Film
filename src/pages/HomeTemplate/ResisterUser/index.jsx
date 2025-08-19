import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "../../../services/api";
import { User, Lock, Mail, Phone, UserPlus } from "lucide-react";

// Schema validate
const schema = z.object({
  taiKhoan: z.string().nonempty("Vui lòng nhập tài khoản"),
  matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
  soDt: z.string().nonempty("Vui lòng nhập số điện thoại"),
  maNhom: z.string().nonempty("Vui lòng nhập mã nhóm"),
  hoTen: z.string().nonempty("Vui lòng nhập họ tên"),
});

export default function RegisterUser() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP00", // mặc định
      hoTen: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/QuanLyNguoiDung/DangKy", values);
      console.log("Đăng ký thành công:", response.data);
      alert("Đăng ký thành công!");
    } catch (error) {
      const errorMessage = error.response?.data?.content || error.message;
      console.error("Đăng ký thất bại:", errorMessage);
      alert(`Đăng ký thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex mt-10 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Đăng ký</h1>
          <p className="text-gray-500">Tạo tài khoản để đặt vé xem phim</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Tài khoản */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tài khoản</label>
            <div className="relative mt-1">
              <input
                type="text"
                {...register("taiKhoan")}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Nhập tài khoản"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.taiKhoan && <p className="text-red-500 text-sm">{errors.taiKhoan.message}</p>}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="relative mt-1">
              <input
                type="password"
                {...register("matKhau")}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Nhập mật khẩu"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.matKhau && <p className="text-red-500 text-sm">{errors.matKhau.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="example@gmail.com"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <div className="relative mt-1">
              <input
                type="text"
                {...register("soDt")}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0123456789"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.soDt && <p className="text-red-500 text-sm">{errors.soDt.message}</p>}
          </div>

          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              type="text"
              {...register("hoTen")}
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Nguyễn Văn A"
            />
            {errors.hoTen && <p className="text-red-500 text-sm">{errors.hoTen.message}</p>}
          </div>

          {/* Mã nhóm */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mã nhóm</label>
            <input
              type="text"
              {...register("maNhom")}
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="GP01"
            />
            {errors.maNhom && <p className="text-red-500 text-sm">{errors.maNhom.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-blue-600 hover:to-purple-700 
              transform hover:scale-[1.02] active:scale-[0.98] 
              shadow-lg transition-all duration-200"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
