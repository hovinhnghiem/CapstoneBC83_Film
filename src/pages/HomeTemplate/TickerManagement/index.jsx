import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../services/api";

export default function TicketManagement() {
  const { user } = useSelector((state) => state.authSlice);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan", {
          taiKhoan: user.taiKhoan,
        });
        setTickets(res.data.content.thongTinDatVe || []);
      } catch (err) {
        console.error("Lỗi lấy vé:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  const handleDeleteTicket = async (maVe) => {
    if (!window.confirm("Bạn có chắc muốn hủy vé này?")) return;
    try {
      // ⚠️ giả định API có hỗ trợ hủy vé
      await api.delete(`/QuanLyDatVe/HuyVe?MaVe=${maVe}`);
      setTickets((prev) => prev.filter((t) => t.maVe !== maVe));
      alert("Hủy vé thành công!");
    } catch (err) {
      console.error(err);
      alert("Hủy vé thất bại!");
    }
  };

  if (!user) {
    return (
      <div className="mt-20 text-center text-red-500 text-lg font-semibold">
        Vui lòng đăng nhập để xem vé đã mua
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">🎟 Quản lý vé của bạn</h1>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải vé...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-gray-600">Bạn chưa mua vé nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, idx) => {
            const tongTien = ticket.danhSachGhe.reduce(
              (sum, ghe) => sum + ghe.giaVe,
              0
            );

            const rap = ticket.danhSachGhe[0]?.tenRap || "";
            const cumRap = ticket.danhSachGhe[0]?.tenHeThongRap || "";

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* Poster */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={ticket.hinhAnh}
                    alt={ticket.tenPhim}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Nội dung vé */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-purple-600 mb-2 line-clamp-2">
                      {ticket.tenPhim}
                    </h2>

                    <p className="text-gray-700">
                      Ngày đặt vé: {new Date(ticket.ngayDat).toLocaleString()}
                    </p>

                    <p className="text-gray-700">Cụm rạp: {cumRap}</p>
                    <p className="text-gray-700">Rạp: {rap}</p>

                    <p className="text-gray-700 mt-1">
                      Ghế:{" "}
                      {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
                    </p>

                    <p className="text-pink-600 font-bold mt-2">
                      Tổng tiền: {tongTien.toLocaleString()} VNĐ
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteTicket(ticket.maVe)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Hủy vé
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
