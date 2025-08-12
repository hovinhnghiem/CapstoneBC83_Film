import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getMovieDetailsApi } from '../../../services/movie.api';
import api from '../../../services/api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  
  // Giữ nguyên useQuery từ code cũ
  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetailsApi(movieId),
    enabled: !!movieId
  });

  // Thêm API call để lấy lịch chiếu phim
  const { data: lichChieuData, isLoading: isLoadingLichChieu } = useQuery({
    queryKey: ["lich-chieu", movieId],
    queryFn: async () => {
      const response = await api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
      return response.data.content;
    },
    enabled: !!movieId
  });

  // Generate dates for the week
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      
      dates.push({
        day: dayNames[date.getDay()],
        date: date.getDate().toString(),
        fullDate: format(date, 'yyyy-MM-dd'),
        isToday: i === 0
      });
    }
    
    return dates;
  };

  const dates = generateDates();

  const handleBooking = (maLichChieu) => {
    navigate(`/booking/${maLichChieu}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    return format(new Date(dateTimeString), 'HH:mm');
  };

  // Render logic giữ nguyên từ code cũ
  if (isLoading || isLoadingLichChieu) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-red-500 text-xl">Có lỗi xảy ra khi tải thông tin phim</p>
    </div>
  );

  // Sử dụng data thật từ API thay vì mock data
  const cinemaSchedule = lichChieuData?.heThongRapChieu || [];

  return (
    <div className="min-h-screen bg-gray-800 text-white" style={{paddingTop: '80px'}}>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${movie?.hinhAnh})`,
            filter: 'blur(2px) brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex items-end space-x-6">
            <img 
              src={movie?.hinhAnh} 
              alt={movie?.tenPhim}
              className="w-40 h-60 rounded-lg shadow-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1 space-y-3">
              <h1 className="text-4xl font-bold text-white leading-tight">
                {movie?.tenPhim}
              </h1>
              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-lg font-semibold">{movie?.danhGia || 8.5}/10</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>Khởi chiếu: {movie?.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Movie Description */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Nội dung phim</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {movie?.moTa}
          </p>
        </div>

        {/* Schedule Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-red-500">Lịch chiếu</h2>
          
          {/* Date Selection */}
          <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
            {dates.map((dateItem, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg text-center min-w-[70px] transition-all duration-200 ${
                  selectedDate === index 
                    ? 'bg-red-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${dateItem.isToday ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className="text-sm font-medium">{dateItem.day}</div>
                <div className="text-xl font-bold">{dateItem.date}</div>
                {dateItem.isToday && (
                  <div className="text-xs text-yellow-400">Hôm nay</div>
                )}
              </button>
            ))}
          </div>

          {/* Cinema Schedule từ API thật */}
          <div className="space-y-6">
            {cinemaSchedule.map((heThongRap, cumRapIndex) => (
              <div key={cumRapIndex} className="border border-gray-700 rounded-xl overflow-hidden">
                {/* Cinema Chain Header */}
                <div className="bg-gray-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <img src={heThongRap.logo} alt={heThongRap.tenHeThongRap} className="w-8 h-8 mr-3" />
                    {heThongRap.tenHeThongRap}
                  </h3>
                </div>
                
                {/* Individual Cinema Locations */}
                {heThongRap.cumRapChieu?.map((cumRap, rapIndex) => (
                  <div key={rapIndex} className="p-6 border-t border-gray-700">
                    {/* Cinema Info */}
                    <div className="mb-6">
                      <h4 className="font-bold text-lg text-white mb-2">{cumRap.tenCumRap}</h4>
                      <p className="text-gray-400 flex items-center">
                        <span className="mr-2">📍</span>
                        {cumRap.diaChi}
                      </p>
                    </div>
                    
                    {/* Showtimes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {cumRap.lichChieuPhim?.map((lichChieu) => (
                        <button
                          key={lichChieu.maLichChieu}
                          onClick={() => handleBooking(lichChieu.maLichChieu)}
                          className="bg-gray-700 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg"
                        >
                          <div className="font-bold text-lg mb-1">
                            {formatTime(lichChieu.ngayChieuGioChieu)}
                          </div>
                          <div className="text-xs text-gray-300 mb-2">
                            2D
                          </div>
                          <div className="text-sm font-semibold text-yellow-400">
                            {formatPrice(lichChieu.giaVe)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Trailer Section */}
        {movie?.trailer && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Trailer</h2>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={movie.trailer.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
                title="Movie Trailer"
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}