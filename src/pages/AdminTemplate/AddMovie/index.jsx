import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function AddMovie() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    trangThai: "false",
    Hot: false,
    danhGia: "",
    hinhAnh: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, hinhAnh: file }));
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, hinhAnh: null }));
  };

  const previewImage = (file) => file ? URL.createObjectURL(file) : "";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tenPhim.trim()) newErrors.tenPhim = "Vui lòng nhập tên phim";
    if (!formData.trailer.trim()) newErrors.trailer = "Vui lòng nhập trailer";
    if (!formData.moTa.trim()) newErrors.moTa = "Vui lòng nhập mô tả";
    if (formData.moTa.length > 200) newErrors.moTa = "Không vượt quá 200 ký tự";
    if (!formData.ngayKhoiChieu) newErrors.ngayKhoiChieu = "Vui lòng chọn ngày";
    if (!formData.danhGia.toString().trim()) newErrors.danhGia = "Vui lòng nhập đánh giá";
    if (!/^([0-9]|10)$/.test(formData.danhGia)) newErrors.danhGia = "Vui lòng nhập từ 0 đến 10";
    if (!formData.hinhAnh) newErrors.hinhAnh = "Vui lòng chọn hình ảnh";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // format date yyyy-MM-dd -> dd/MM/yyyy
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("tenPhim", formData.tenPhim);
      formDataUpload.append("trailer", formData.trailer);
      formDataUpload.append("moTa", formData.moTa);
      formDataUpload.append("maNhom", formData.maNhom);
      formDataUpload.append("ngayKhoiChieu", formatDate(formData.ngayKhoiChieu));
      formDataUpload.append("dangChieu", formData.trangThai === "true");
      formDataUpload.append("sapChieu", formData.trangThai === "false");
      formDataUpload.append("hot", formData.Hot);
      formDataUpload.append("danhGia", formData.danhGia);
      formDataUpload.append("File", formData.hinhAnh);

      await api.post("/QuanLyPhim/ThemPhimUploadHinh", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("🎉 Thêm phim thành công!");
      navigate("/admin/movies-management"); // 👉 quay lại trang quản lý phim
    } catch (err) {
      console.error("❌ Lỗi thêm phim:", err.response?.data || err.message);
      alert(err.response?.data?.content || "❌ Thêm phim thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎬 Thêm Phim Mới</h1>
          <p className="text-gray-600">Tạo nội dung phim hấp dẫn cho khán giả</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <span className="mr-3">📝</span> Thông tin chi tiết phim
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Tên phim */}
                <div>
                  <label className="block text-sm font-semibold mb-2">🎭 Tên phim</label>
                  <input
                    type="text"
                    name="tenPhim"
                    value={formData.tenPhim}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {errors.tenPhim && <p className="text-red-500 text-sm">{errors.tenPhim}</p>}
                </div>
                {/* Trailer */}
                <div>
                  <label className="block text-sm font-semibold mb-2">🎥 Trailer</label>
                  <input
                    type="url"
                    name="trailer"
                    value={formData.trailer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {errors.trailer && <p className="text-red-500 text-sm">{errors.trailer}</p>}
                </div>
                {/* Mô tả */}
                <div>
                  <label className="block text-sm font-semibold mb-2">📄 Mô tả</label>
                  <textarea
                    name="moTa"
                    value={formData.moTa}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {errors.moTa && <p className="text-red-500 text-sm">{errors.moTa}</p>}
                </div>
                {/* Ngày & Đánh giá */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">📅 Ngày khởi chiếu</label>
                    <input
                      type="date"
                      name="ngayKhoiChieu"
                      value={formData.ngayKhoiChieu}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                    {errors.ngayKhoiChieu && <p className="text-red-500 text-sm">{errors.ngayKhoiChieu}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">⭐ Đánh giá</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      name="danhGia"
                      value={formData.danhGia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                    {errors.danhGia && <p className="text-red-500 text-sm">{errors.danhGia}</p>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Poster */}
                <div>
                  <label className="block text-sm font-semibold mb-2">🖼️ Poster</label>
                  {!formData.hinhAnh ? (
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                  ) : (
                    <div className="relative">
                      <img src={previewImage(formData.hinhAnh)} alt="Preview" className="rounded-lg" />
                      <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg">
                        X
                      </button>
                    </div>
                  )}
                  {errors.hinhAnh && <p className="text-red-500 text-sm">{errors.hinhAnh}</p>}
                </div>
                {/* Trạng thái */}
                <div>
                  <label className="block text-sm font-semibold mb-2">🎪 Trạng thái chiếu</label>
                  <div className="flex gap-4">
                    <label>
                      <input type="radio" name="trangThai" value="true" checked={formData.trangThai === "true"} onChange={handleInputChange} /> Đang chiếu
                    </label>
                    <label>
                      <input type="radio" name="trangThai" value="false" checked={formData.trangThai === "false"} onChange={handleInputChange} /> Sắp chiếu
                    </label>
                  </div>
                </div>
                {/* Hot */}
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" name="Hot" checked={formData.Hot} onChange={handleInputChange} className="mr-2" /> 🔥 Phim Hot
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? "Đang xử lý..." : "✨ Tạo phim mới"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
