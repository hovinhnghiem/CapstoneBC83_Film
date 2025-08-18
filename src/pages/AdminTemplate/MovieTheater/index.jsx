import React, { useEffect, useState } from "react";
import api from "../../../services/api";

export default function MovieTheater() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await api.get("/QuanLyRap/LayThongTinHeThongRap");
        setTheaters(res.data.content);
      } catch (err) {
        setError("Không thể tải danh sách rạp chiếu!");
      } finally {
        setLoading(false);
      }
    };
    fetchTheaters();
  }, []);

  if (loading) return <p className="text-center p-4">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Quản lý Hệ Thống Rạp
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-left">Mã</th>
              <th className="px-4 py-3 border text-left">Tên Hệ Thống</th>
              <th className="px-4 py-3 border text-left">Bí Danh</th>
              <th className="px-4 py-3 border text-center">Logo</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((rap) => (
              <tr key={rap.maHeThongRap} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{rap.maHeThongRap}</td>
                <td className="px-4 py-3 border">{rap.tenHeThongRap}</td>
                <td className="px-4 py-3 border">{rap.biDanh}</td>
                <td className="px-4 py-3 border text-center">
                  <img
                    src={rap.logo}
                    alt={rap.tenHeThongRap}
                    className="h-12 mx-auto object-contain"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
