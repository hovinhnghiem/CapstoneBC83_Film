import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';

interface Banner {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

export default function BannerCarousel() {
  const [slides, setSlides] = useState<Banner[]>([]);

  useEffect(() => {
    axios
      .get('https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner', {
        headers: {
          TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4' // 🔹 Thay token thật
        }
      })
      .then((res) => {
        setSlides(res.data.content);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu banner:', err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="carousel-container mt-50px">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.maBanner}>
            <img src={slide.hinhAnh} alt={`Banner ${slide.maBanner}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
