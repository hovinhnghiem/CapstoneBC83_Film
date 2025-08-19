import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Film, Calendar, Star, Image, Link, FileText } from "lucide-react";

// Schema validate
const schema = z.object({
  tenPhim: z.string().nonempty("Tên phim không được để trống"),
  trailer: z.string().url("Trailer phải là URL hợp lệ"),
  moTa: z.string().nonempty("Mô tả không được để trống"),
  ngayKhoiChieu: z.string().nonempty("Vui lòng nhập ngày khởi chiếu"),
  danhGia: z.string().nonempty("Vui lòng nhập đánh giá"),
});

export default function EditMovie() {
  const { maPhim } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  // Lấy thông tin phim cũ
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
        const movie = res.data.content;

        // set giá trị form
        setValue("tenPhim", movie.tenPhim);
        setValue("trailer", movie.trailer);
        setValue("moTa", movie.moTa);
        setValue("ngayKhoiChieu", movie.ngayKhoiChieu.slice(0, 10));
        setValue("danhGia", movie.danhGia);
        setPreviewImage(movie.hinhAnh);
      } catch (err) {
        console.error(err);
        alert("Không tải được thông tin phim");
      }
    };
    fetchMovie();
  }, [maPhim, setValue]);

  // Submit
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("maPhim", maPhim);
      formData.append("tenPhim", values.tenPhim);
      formData.append("trailer", values.trailer);
      formData.append("moTa", values.moTa);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("danhGia", values.danhGia);
      formData.append("maNhom", "GP01");

      if (values.hinhAnh?.[0]) {
        formData.append("File", values.hinhAnh[0]);
      }

      await api.post("/QuanLyPhim/CapNhatPhimUpload", formData);
      alert("Cập nhật phim thành công!");
      navigate("/admin/movies-management");
    } catch (err) {
      console.error(err);
      alert("Cập nhật phim thất bại!");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          Chỉnh sửa phim
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tên phim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Film className="w-4 h-4" /> Tên phim
            </label>
            <input
              type="text"
              {...register("tenPhim")}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.tenPhim && <p className="text-red-500 text-sm">{errors.tenPhim.message}</p>}
          </div>

          {/* Trailer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Link className="w-4 h-4" /> Trailer
            </label>
            <input
              type="text"
              {...register("trailer")}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.trailer && <p className="text-red-500 text-sm">{errors.trailer.message}</p>}
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Mô tả
            </label>
            <textarea
              rows={4}
              {...register("moTa")}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.moTa && <p className="text-red-500 text-sm">{errors.moTa.message}</p>}
          </div>

          {/* Ngày khởi chiếu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Ngày khởi chiếu
            </label>
            <input
              type="date"
              {...register("ngayKhoiChieu")}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.ngayKhoiChieu && <p className="text-red-500 text-sm">{errors.ngayKhoiChieu.message}</p>}
          </div>

          {/* Đánh giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4" /> Đánh giá
            </label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("danhGia")}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {errors.danhGia && <p className="text-red-500 text-sm">{errors.danhGia.message}</p>}
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4" /> Hình ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("hinhAnh")}
              className="mt-1 block w-full text-sm text-gray-500"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="mt-3 w-40 rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-purple-500 to-blue-600 
            hover:from-purple-600 hover:to-blue-700 
            transform hover:scale-[1.02] active:scale-[0.98] 
            shadow-lg transition-all duration-200"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
}
