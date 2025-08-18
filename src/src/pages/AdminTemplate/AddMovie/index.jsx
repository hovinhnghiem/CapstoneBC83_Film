import { useState } from 'react';

export default function AddMovie() {
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
    
    // Clear error when user starts typing
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
    if (!formData.danhGia.trim()) newErrors.danhGia = "Vui lòng nhập đánh giá";
    if (!/^([0-9]|10)$/.test(formData.danhGia)) newErrors.danhGia = "Vui lòng nhập từ 0 đến 10";
    if (!formData.hinhAnh) newErrors.hinhAnh = "Vui lòng chọn hình ảnh";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Thêm phim thành công!");
      setIsSubmitting(false);
      // Reset form
      setFormData({
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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎬 Thêm Phim Mới
          </h1>
          <p className="text-gray-600">Tạo nội dung phim hấp dẫn cho khán giả</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <span className="mr-3">📝</span>
              Thông tin chi tiết phim
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Movie Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">🎭</span>
                    Tên phim
                  </label>
                  <input
                    type="text"
                    name="tenPhim"
                    value={formData.tenPhim}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.tenPhim ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                    }`}
                    placeholder="Nhập tên phim..."
                  />
                  {errors.tenPhim && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.tenPhim}</p>}
                </div>

                {/* Trailer */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">🎥</span>
                    Trailer URL
                  </label>
                  <input
                    type="url"
                    name="trailer"
                    value={formData.trailer}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.trailer ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                    }`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {errors.trailer && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.trailer}</p>}
                </div>

                {/* Description */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📄</span>
                    Mô tả phim
                  </label>
                  <textarea
                    name="moTa"
                    value={formData.moTa}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                      errors.moTa ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                    }`}
                    placeholder="Mô tả nội dung phim..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.moTa && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.moTa}</p>}
                    <span className={`text-sm ml-auto ${formData.moTa.length > 180 ? 'text-red-500' : 'text-gray-400'}`}>
                      {formData.moTa.length}/200
                    </span>
                  </div>
                </div>

                {/* Release Date & Rating */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2">📅</span>
                      Ngày khởi chiếu
                    </label>
                    <input
                      type="date"
                      name="ngayKhoiChieu"
                      value={formData.ngayKhoiChieu}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer ${
                        errors.ngayKhoiChieu ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                      }`}
                    />
                    {errors.ngayKhoiChieu && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.ngayKhoiChieu}</p>}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2">⭐</span>
                      Đánh giá (0-10)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      name="danhGia"
                      value={formData.danhGia}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.danhGia ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="8.5"
                    />
                    {errors.danhGia && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.danhGia}</p>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Image Upload */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">🖼️</span>
                    Poster phim
                  </label>
                  
                  {!formData.hinhAnh ? (
                    <div className="relative">
                      <input
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer ${
                        errors.hinhAnh ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}>
                        <div className="text-6xl mb-4">📤</div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">Tải lên poster</p>
                        <p className="text-gray-500">PNG, JPG hoặc JPEG</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={previewImage(formData.hinhAnh)} 
                        alt="Preview" 
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                  {errors.hinhAnh && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.hinhAnh}</p>}
                </div>

                {/* Status Options */}
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="mr-2">🎪</span>
                      Trạng thái chiếu
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        formData.trangThai === "true" ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          name="trangThai"
                          value="true"
                          checked={formData.trangThai === "true"}
                          onChange={handleInputChange}
                          className="mr-3 cursor-pointer"
                        />
                        <span className="font-semibold">🟢 Đang chiếu</span>
                      </label>
                      <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        formData.trangThai === "false" ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-gray-200 hover:border-yellow-300'
                      }`}>
                        <input
                          type="radio"
                          name="trangThai"
                          value="false"
                          checked={formData.trangThai === "false"}
                          onChange={handleInputChange}
                          className="mr-3 cursor-pointer"
                        />
                        <span className="font-semibold">🟡 Sắp chiếu</span>
                      </label>
                    </div>
                  </div>

                  {/* Hot Movie Toggle */}
                  <div className="group">
                    <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.Hot ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                    }`}>
                      <input
                        type="checkbox"
                        name="Hot"
                        checked={formData.Hot}
                        onChange={handleInputChange}
                        className="mr-3 w-5 h-5 cursor-pointer"
                      />
                      <span className="flex items-center">
                        <span className="text-2xl mr-2">🔥</span>
                        <span className="font-semibold text-gray-700">Phim Hot</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Đang xử lý...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span>
                    Tạo phim mới
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="flex items-center justify-center">
            <span className="mr-2">💡</span>
            Hãy đảm bảo tất cả thông tin đều chính xác trước khi submit
          </p>
        </div>
      </div>
    </div>
  );
}