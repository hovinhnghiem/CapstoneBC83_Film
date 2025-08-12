import React from "react";
import BannerCarousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import ListMoviePage from "../ListMoviePage"; // đã import
import ListMovieHomePage from "./ListMovieHomePage";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Carousel */}
      <BannerCarousel />

      {/* List phim */}
      <div className="mt-5 container mx-auto px-4">
        {/* Hiển thị 2 hàng phim (4 cột x 2 hàng = 8 phim) */}
        <ListMovieHomePage />

        {/* Nút xem thêm */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/list-movie")}
            className="px-5 py-2 bg-blue-500 mb-10 hover:bg-blue-600 text-white rounded transition"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}
