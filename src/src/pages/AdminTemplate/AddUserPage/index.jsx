import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import z from "zod"
import api from "../../../services/api"

const schema = z.object({
  taiKhoan: z.string().nonempty("Vui lòng nhập tài khoản"),
  matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  soDt: z.string().nonempty("Vui lòng nhập số điện thoại"),
  maNhom: z.string().nonempty("Vui lòng nhập mã nhóm"),
  hoTen: z.string().nonempty("Vui lòng nhập họ tên")
})

export default function RegisterUserPage() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: ""
    },
    resolver: zodResolver(schema)
  })

  const errors = formState.errors

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/QuanLyNguoiDung/DangKy", values)
      console.log("Đăng ký thành công:", response.data)
      alert("Đăng ký thành công!")
    } catch (error) {
      console.error("Đăng ký thất bại:", error)
      alert("Đăng ký thất bại. Vui lòng thử lại.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Đăng ký người dùng</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Tài khoản */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tài khoản</label>
            <input
              type="text"
              {...register("taiKhoan")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.taiKhoan && <p className="text-red-500 text-sm">{errors.taiKhoan.message}</p>}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register("matKhau")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.matKhau && <p className="text-red-500 text-sm">{errors.matKhau.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              {...register("soDt")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.soDt && <p className="text-red-500 text-sm">{errors.soDt.message}</p>}
          </div>

          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              type="text"
              {...register("hoTen")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.hoTen && <p className="text-red-500 text-sm">{errors.hoTen.message}</p>}
          </div>

          {/* Mã nhóm */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mã nhóm</label>
            <input
              type="text"
              {...register("maNhom")}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
            {errors.maNhom && <p className="text-red-500 text-sm">{errors.maNhom.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition duration-200"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}
