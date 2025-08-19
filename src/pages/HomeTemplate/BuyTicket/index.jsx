import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../services/api";

export default function BuyTicket() {
  const { maLichChieu } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);

  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [gheDangChon, setGheDangChon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
        
        const originalSeats = res.data.content.danhSachGhe;
        const totalSeats = originalSeats.length;
        const seatsPerRow = 12;
        const totalRows = Math.ceil(totalSeats / seatsPerRow);
        
        // Phân loại ghế
        const vipSeats = originalSeats.filter(seat => seat.loaiGhe === "Vip");
        const normalSeats = originalSeats.filter(seat => seat.loaiGhe !== "Vip");
        
        // Tạo ma trận ghế với layout cân đối
        const seatMatrix = Array(totalRows).fill(null).map(() => Array(seatsPerRow).fill(null));
        
        let vipIndex = 0;
        let normalIndex = 0;
        
        // Định nghĩa khu vực VIP cân đối hơn (trung tâm rạp)
        const vipRows = [
          Math.floor(totalRows * 0.3), // Bắt đầu từ 30% chiều cao rạp
          Math.floor(totalRows * 0.7)  // Kết thúc ở 70% chiều cao rạp
        ];
        
        // Đặt ghế theo từng hàng để tạo sự cân đối
        for (let row = 0; row < totalRows; row++) {
          for (let col = 0; col < seatsPerRow; col++) {
            // Khu vực VIP: trung tâm theo chiều dọc và ngang
            const isVipRow = row >= vipRows[0] && row <= vipRows[1];
            const isVipCol = col >= 2 && col <= 9; // Trung tâm theo chiều ngang
            const isVipPosition = isVipRow && isVipCol;
            
            if (isVipPosition && vipIndex < vipSeats.length) {
              seatMatrix[row][col] = vipSeats[vipIndex];
              vipIndex++;
            } else if (normalIndex < normalSeats.length) {
              seatMatrix[row][col] = normalSeats[normalIndex];
              normalIndex++;
            }
          }
        }
        
        // Chuyển matrix thành array 1 chiều, loại bỏ null
        const finalSeats = [];
        for (let row = 0; row < totalRows; row++) {
          for (let col = 0; col < seatsPerRow; col++) {
            if (seatMatrix[row][col] !== null) {
              finalSeats.push(seatMatrix[row][col]);
            }
          }
        }
        
        setDanhSachGhe(finalSeats);
        setThongTinPhim(res.data.content.thongTinPhim);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [maLichChieu]);

  // toggle chọn ghế
  const handleChonGhe = (ghe) => {
    if (ghe.daDat) return; // ghế đã đặt thì không chọn
    setGheDangChon((prev) =>
      prev.some((g) => g.maGhe === ghe.maGhe)
        ? prev.filter((g) => g.maGhe !== ghe.maGhe)
        : [...prev, ghe]
    );
  };

  // tổng tiền
  const tongTien = gheDangChon.reduce((sum, ghe) => sum + ghe.giaVe, 0);

  // submit đặt vé
  const handleBooking = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt vé!");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        maLichChieu,
        danhSachVe: gheDangChon.map((ghe) => ({
          maGhe: ghe.maGhe,
          giaVe: ghe.giaVe,
        })),
      };

      await api.post("/QuanLyDatVe/DatVe", payload);
      alert("Đặt vé thành công!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Đặt vé thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Khu vực chọn ghế */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Chọn ghế của bạn</h2>
              <p className="text-gray-300">Chọn ghế ngồi thoải mái nhất cho trải nghiệm tuyệt vời</p>
            </div>

            {/* Màn hình */}
            <div className="mb-8">
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-2 opacity-80"></div>
              <p className="text-center text-sm text-gray-300 font-medium">MÀN HÌNH</p>
            </div>

            {/* Sơ đồ ghế */}
            <div className="relative">
              {/* Multiple VIP zones highlight */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* VIP Zone 1 - Center area */}
                <div 
                  className="absolute bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-400/30 rounded-xl backdrop-blur-sm"
                  style={{
                    left: `calc(${(2/12) * 100}% - 4px)`,
                    top: `calc(30% - 4px)`,
                    width: `calc(${(8/12) * 100}% + 8px)`,
                    height: `calc(40% + 8px)`
                  }}
                />
                
              </div>
              
              {/* Grid ghế */}
              <div className="grid gap-2 justify-center relative z-10 pt-12" 
                   style={{ 
                     gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                     maxWidth: '600px',
                     margin: '0 auto'
                   }}>
                {danhSachGhe.map((ghe, index) => {
                  const isSelected = gheDangChon.some((g) => g.maGhe === ghe.maGhe);
                  const isVipSeat = ghe.loaiGhe === "Vip";
                  
                  // Tạo khoảng cách giữa các khu vực để dễ nhìn
                  const row = Math.floor(index / 12);
                  const col = index % 12;
                  const isAisle = col === 2 || col === 9; // Lối đi
                  
                  return (
                    <button
                      key={ghe.maGhe}
                      onClick={() => handleChonGhe(ghe)}
                      className={`
                        w-9 h-9 rounded-lg font-semibold text-xs transition-all duration-300 transform hover:scale-110 shadow-lg relative
                        ${isAisle ? 'mr-1' : ''}
                        ${ghe.daDat 
                          ? "bg-red-600 text-white cursor-not-allowed shadow-red-600/50" 
                          : ""}
                        ${isSelected && !ghe.daDat
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/50 scale-110" 
                          : ""}
                        ${!ghe.daDat && !isSelected && isVipSeat
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-yellow-500/50" 
                          : ""}
                        ${!ghe.daDat && !isSelected && !isVipSeat
                          ? "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-blue-500/50" 
                          : ""}
                      `}
                    >
                      {ghe.tenGhe}
                      {isVipSeat && !ghe.daDat && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full flex items-center justify-center">
                          <span className="text-xs text-yellow-800 leading-none">★</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Row labels */}
              <div className="absolute left-0 top-12 h-full flex flex-col justify-start space-y-2 pt-1">
                {Array.from({length: Math.ceil(danhSachGhe.length / 12)}, (_, i) => (
                  <div key={i} className="w-6 h-9 flex items-center justify-center text-white/60 text-xs font-medium">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>

            {/* Chú thích */}
            <div className="flex flex-wrap mt-10 justify-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg"></div>
                <span className="text-white font-medium">Ghế thường</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full flex items-center justify-center">
                    <span className="text-xs text-yellow-800">★</span>
                  </div>
                </div>
                <span className="text-white font-medium">Ghế VIP</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-lg"></div>
                <span className="text-white font-medium">Đang chọn</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-lg shadow-lg"></div>
                <span className="text-white font-medium">Đã đặt</span>
              </div>
            </div>
          </div>

          {/* Khu vực thông tin đặt vé */}
          <div className="w-full lg:w-96">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl sticky top-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Thông tin đặt vé</h2>
              </div>

              {/* Thông tin phim */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-medium">PHIM</span>
                  </div>
                  <p className="text-white font-semibold text-lg">{thongTinPhim.tenPhim}</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-medium">LỊCH CHIẾU</span>
                  </div>
                  <p className="text-white font-semibold">{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-medium">RạP CHIẾU</span>
                  </div>
                  <p className="text-white font-semibold">{thongTinPhim.tenCumRap}</p>
                  <p className="text-gray-300 text-sm">{thongTinPhim.tenRap}</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-medium">KHÁCH HÀNG</span>
                  </div>
                  <p className="text-white font-semibold">{user?.hoTen || "Chưa đăng nhập"}</p>
                </div>
              </div>

              {/* Chi tiết vé */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-300">Số vé:</span>
                  <span className="text-white font-bold text-lg">{gheDangChon.length}</span>
                </div>
                
                <div className="p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-300 block mb-2">Ghế đã chọn:</span>
                  <div className="flex flex-wrap gap-2">
                    {gheDangChon.map((g) => (
                      <span key={g.maGhe} className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold rounded-full">
                        {g.tenGhe}
                      </span>
                    ))}
                    {gheDangChon.length === 0 && (
                      <span className="text-gray-400 italic">Chưa chọn ghế nào</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                  <span className="text-white font-semibold text-lg">Tổng tiền:</span>
                  <span className="text-white font-bold text-2xl">{tongTien.toLocaleString()} VNĐ</span>
                </div>
              </div>

              {/* Nút đặt vé */}
              <button
                onClick={handleBooking}
                disabled={!gheDangChon.length}
                className={`
                  w-full py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl
                  ${gheDangChon.length 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-purple-500/50" 
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {gheDangChon.length ? "🎬 Đặt vé ngay" : "Vui lòng chọn ghế"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}