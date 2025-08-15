import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../../../services/api";

export default function SetCalendar() {
  const { maPhim } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [form, setForm] = useState({
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: ""
  });

  // Lấy thông tin phim
  useEffect(() => {
    api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then(res => setMovie(res.data.content))
      .catch(err => console.error(err));
  }, [maPhim]);

  // Lấy hệ thống rạp
  useEffect(() => {
    api.get("/QuanLyRap/LayThongTinHeThongRap")
      .then(res => setHeThongRap(res.data.content))
      .catch(err => console.error(err));
  }, []);

  // Khi chọn hệ thống rạp thì load cụm rạp
  const handleHeThongRapChange = (e) => {
    const maHeThongRap = e.target.value;
    if (!maHeThongRap) return;
    api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
      .then(res => setCumRap(res.data.content))
      .catch(err => console.error(err));
  };

  // Gửi form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format ngày theo yêu cầu API
    const dateObj = new Date(form.ngayChieuGioChieu);
    const formattedDate = format(dateObj, "dd/MM/yyyy HH:mm:ss");

    const payload = {
      maPhim: Number(maPhim),
      ngayChieuGioChieu: formattedDate,
      maRap: form.maRap,
      giaVe: Number(form.giaVe)
    };

    api.post("/QuanLyDatVe/TaoLichChieu", payload)
      .then(() => {
        alert("Tạo lịch chiếu thành công!");
        navigate("/admin/movies-management");
      })
      .catch(err => {
        console.error(err);
        alert("Tạo lịch chiếu thất bại!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-6">
            {movie && (
              <div className="relative">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="w-32 h-48 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Tạo lịch chiếu
              </h1>
              <p className="text-xl text-blue-600 font-semibold">
                {movie?.tenPhim}
              </p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-blue-700 text-sm font-medium">Phim đang được thiết lập</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hệ thống rạp */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🏢 Hệ thống rạp
                </label>
                <div className="relative">
                  <select
                    onChange={handleHeThongRapChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                  >
                    <option value="">Chọn hệ thống rạp</option>
                    {heThongRap.map(rap => (
                      <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
                        {rap.tenHeThongRap}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cụm rạp */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🎬 Cụm rạp
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setForm({ ...form, maRap: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                  >
                    <option value="">Chọn cụm rạp</option>
                    {cumRap.map(cum => (
                      <option key={cum.maCumRap} value={cum.maCumRap}>
                        {cum.tenCumRap}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ngày chiếu */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📅 Ngày chiếu giờ chiếu
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                    onChange={(e) => setForm({ ...form, ngayChieuGioChieu: e.target.value })}
                  />
                </div>
              </div>

              {/* Giá vé */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  💰 Giá vé (VNĐ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                    onChange={(e) => setForm({ ...form, giaVe: e.target.value })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-400 text-sm">VNĐ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/admin/movies-management")}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  ← Quay lại
                </button>
                <button
                  type="submit"
                  className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Tạo lịch chiếu</span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bước 1</p>
                <p className="font-semibold text-gray-800">Chọn rạp</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">⏰</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bước 2</p>
                <p className="font-semibold text-gray-800">Chọn thời gian</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg">💎</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bước 3</p>
                <p className="font-semibold text-gray-800">Định giá vé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}