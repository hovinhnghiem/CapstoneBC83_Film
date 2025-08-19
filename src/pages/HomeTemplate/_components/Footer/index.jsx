export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Cột 1 - Logo */}
        <div>
          <img src="/logo.jpeg" alt="Logo" className="w-16 mb-3" />
          <h2 className="text-white text-lg font-semibold">Vinh Nghiem Cinema</h2>
          <p className="text-sm mt-2">
            Trải nghiệm điện ảnh đỉnh cao với chất lượng dịch vụ tốt nhất.
          </p>
        </div>

        {/* Cột 2 - Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-500">Home</a></li>
            <li><a href="/about" className="hover:text-red-500">About</a></li>
            <li><a href="/list-movie" className="hover:text-red-500">Movies</a></li>
            <li><a href="/news" className="hover:text-red-500">News</a></li>
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ */}
        <div>
          <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-500">FAQ</a></li>
            <li><a href="#" className="hover:text-red-500">Điều khoản</a></li>
            <li><a href="#" className="hover:text-red-500">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-red-500">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ */}
        <div>
          <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
          <p>📍 112 Cao Thắng, Phường 4, Quận 3, Hồ Chí Minh</p>
          <p>📞 0888 629 615</p>
          <p>📧 info@vinhnghiemcinema.com</p>
          
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Vinh Nghiem Cinema. All rights reserved.
      </div>
    </footer>
  );
}
