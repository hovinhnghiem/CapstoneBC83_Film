import { useNavigate } from "react-router-dom";

export default function HomeMovie({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie-details/${movie.maPhim}`);
  };

  const handleBooking = () => {
    navigate(`/booking/${movie.maPhim}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition duration-300 group">
      {/* Ảnh phim với hiệu ứng hover */}
      <div className="relative w-full h-100 overflow-hidden">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-4">
        {/* Tên phim */}
        <h5 className="text-lg font-semibold text-gray-900 text-center mb-4 line-clamp-2">
          {movie.tenPhim}
        </h5>

        {/* Nút */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition"
          >
            Chi tiết
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded transition"
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}
