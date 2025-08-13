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
        // Lấy danh sách user
        const userRes = await api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00");
        const users = userRes.data.content || [];
        const adminCount = users.filter((u) => u.maLoaiNguoiDung === "QuanTri").length;

        // Lấy danh sách phim
        const movieRes = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP00");
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
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex items-center space-x-2">
        <Link to="/admin" className="flex items-center space-x-1 hover:text-blue-600">
          <span>🏠</span>
          <span>Admin</span>
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-700">Dashboard</span>
      </div>

      {/* Nút về Home */}
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
