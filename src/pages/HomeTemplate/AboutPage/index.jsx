import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { number: "5M+", label: "Khách hàng hài lòng", icon: "👥" },
    { number: "1200+", label: "Rạp chiếu phim", icon: "🎬" },
    { number: "50+", label: "Thành phố", icon: "🏙️" },
    { number: "24/7", label: "Hỗ trợ khách hàng", icon: "🎧" }
  ];

  const teamMembers = [
    {
      name: "CoCa Cola",
      position: "Thương hiệu nước giải khát",
      avatar: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Cocacola-Ci.png",
      description: "Có mặt trên toàn cầu"
    },
    {
      name: "BOSE",
      position: "Thương hiệu âm thanh",
      avatar: "https://bosebyupsv.com/wp-content/uploads/2022/11/logo.png",
      description: "Âm thanh sống động"
    },
    {
      name: "SamSung",
      position: "Đối tác hình ảnh",
      avatar: "https://hienlaptop.com/wp-content/uploads/2024/12/logo-samsung-vector-6.png",
      description: "Đổi mới công nghệ rạp chiếu phim"
    },
    {
      name: "Vincom",
      position: "Đối tác cụm rạp toàn quốc",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOfJFv4Thziruv7BxdTX-WTMnTbvnNIM6NA&s",
      description: "Tối ưu không gian giải trí"
    }
  ];

  const values = [
    {
      title: "Chất lượng tuyệt vời",
      description: "Cam kết mang đến trải nghiệm xem phim với chất lượng hình ảnh và âm thanh tốt nhất",
      icon: "⭐",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Dịch vụ tận tâm",
      description: "Đội ngũ nhân viên chuyên nghiệp, nhiệt tình phục vụ khách hàng 24/7",
      icon: "❤️",
      color: "from-pink-400 to-red-500"
    },
    {
      title: "Công nghệ hiện đại",
      description: "Ứng dụng công nghệ tiên tiến nhất trong ngành để nâng cao trải nghiệm",
      icon: "🚀",
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "Giá cả hợp lý",
      description: "Mang đến những bộ phim chất lượng với mức giá phù hợp với mọi khách hàng",
      icon: "💎",
      color: "from-green-400 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Về chúng tôi
          </motion.h1>
          <motion.p
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hệ thống rạp chiếu phim hàng đầu Việt Nam, mang đến trải nghiệm giải trí tuyệt vời nhất.
          </motion.p>
          <motion.img
            src="https://png.pngtree.com/background/20210711/original/pngtree-coming-soon-movie-in-cinema-theater-billboard-sign-on-red-theater-picture-image_1157635.jpg"
            alt="Cinema Experience"
            className="rounded-2xl shadow-2xl w-full max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-4xl font-bold">{s.number}</div>
                <div className="text-gray-600">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold">Giá trị cốt lõi</h2>
          <p className="text-gray-600 mt-2">Định hướng mọi hoạt động phục vụ khách hàng</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${v.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-600">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold">Đối tác</h2>
          <p className="text-gray-600 mt-2">Những người bạn đồng hành và phát triển</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg text-center group hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg group-hover:scale-105 transition-transform"
              />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-blue-600 text-sm mb-2">{m.position}</p>
              <p className="text-gray-600 text-sm">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
