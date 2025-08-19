import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import api from "../../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminCount: 0,
    nowShowing: 0,
    comingSoon: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get list user
        const userRes = await api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00");
        const users = userRes.data.content || [];
        const adminCount = users.filter((u) => u.maLoaiNguoiDung === "QuanTri").length;

        // get list film
        const movieRes = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP02");
        const movies = movieRes.data.content || [];
        const nowShowing = movies.filter((m) => m.dangChieu).length;
        const comingSoon = movies.filter((m) => m.sapChieu).length;

        setStats({
          totalUsers: users.length,
          adminCount,
          nowShowing,
          comingSoon,
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Dashboard:", error);
      }
    };

    fetchData();
  }, []);

  const userChartData = {
    labels: ["Admin", "User thường"],
    datasets: [
      {
        data: [stats.adminCount, stats.totalUsers - stats.adminCount],
        backgroundColor: ["#ef4444", "#3b82f6"],
      },
    ],
  };

  const movieChartData = {
    labels: ["Phim Đang Chiếu", "Phim Sắp Chiếu"],
    datasets: [
      {
        data: [stats.nowShowing, stats.comingSoon],
        backgroundColor: ["#22c55e", "#facc15"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14 },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value) => value, // Hiển thị giá trị
      },
    },
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Admin
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
              </svg>
              <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Dash Board</a>
            </div>
          </li>

        </ol>
      </nav>

      {/* Home Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ⬅ Về trang Home
        </button>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="text-lg font-bold text-center mb-4">Tỉ lệ User & Admin</h2>
          <div className="w-64 h-64">
            <Pie data={userChartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="text-lg font-bold text-center mb-4">Tỉ lệ Phim</h2>
          <div className="w-64 h-64">
            <Pie data={movieChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
