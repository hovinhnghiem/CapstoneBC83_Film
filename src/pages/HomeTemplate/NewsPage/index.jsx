import { useState } from "react";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tất cả", icon: "📰" },
    { id: "premiere", name: "Khởi chiếu", icon: "🎬" },
    { id: "review", name: "Đánh giá", icon: "⭐" },
    { id: "interview", name: "Phỏng vấn", icon: "🎤" },
    { id: "event", name: "Sự kiện", icon: "🎉" }
  ];

  const featuredNews = {
    id: 1,
    title: "Avatar: The Way of Water - Siêu phẩm điện ảnh kỷ nguyên mới đã có mặt tại Việt Nam",
    excerpt: "James Cameron trở lại với phần tiếp theo hoành tráng của Avatar sau 13 năm chờ đợi. Bộ phim hứa hẹn mang đến những trải nghiệm thị giác chưa từng có.",
    image: "https://vfx-animation.vn/wp-content/uploads/2022/12/Avatar2-1500x948-1.jpg",
    author: "Nguyễn Minh Hoàng",
    date: "15/08/2025",
    readTime: "5 phút đọc",
    category: "premiere",
    views: "12.5K"
  };

  const newsData = [
    {
      id: 2,
      title: "Top Gun: Maverick phá vỡ mọi kỷ lục doanh thu tại Việt Nam",
      excerpt: "Bộ phim hành động kịch tính của Tom Cruise đã thu về 45 tỷ đồng chỉ trong tuần đầu công chiếu.",
      image: "https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2022/10/26/2091444291941/TGMAV_SAlone_16_9_1920x1080_1781067_1920x1080.jpg",
      author: "Trần Thị Lan",
      date: "14/08/2025",
      readTime: "3 phút đọc",
      category: "premiere",
      views: "8.2K"
    },
    {
      id: 3,
      title: "Phỏng vấn độc quyền: Đạo diễn Nguyễn Quang Dũng chia sẻ về dự án mới",
      excerpt: "Nhà làm phim tài năng tiết lộ những kế hoạch tham vọng cho điện ảnh Việt Nam trong năm 2025.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      author: "Lê Văn Minh",
      date: "13/08/2025",
      readTime: "7 phút đọc",
      category: "interview",
      views: "6.7K"
    },
    {
      id: 4,
      title: "Đánh giá: Spider-Man: Across the Spider-Verse - Tuyệt tác hoạt hình",
      excerpt: "Phần tiếp theo của Into the Spider-Verse mang đến những cải tiến vượt bậc về mặt kỹ thuật và câu chuyện.",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=250&fit=crop",
      author: "Phạm Hoàng Anh",
      date: "12/08/2025",
      readTime: "6 phút đọc",
      category: "review",
      views: "9.1K"
    },
    {
      id: 5,
      title: "CGV Việt Nam khai trương rạp chiếu 4DX đầu tiên tại Hà Nội",
      excerpt: "Công nghệ chiếu phim 4DX với ghế chuyển động và hiệu ứng môi trường sẽ mang đến trải nghiệm hoàn toàn mới.",
      image: "https://variety.com/wp-content/uploads/2022/08/4dx-auditorium.jpg?w=1000&h=563&crop=1",
      author: "Vũ Thu Hương",
      date: "11/08/2025",
      readTime: "4 phút đọc",
      category: "event",
      views: "15.3K"
    },
    {
      id: 6,
      title: "Fast X: Gia đình của Dom Toretto trở lại với những pha hành động điên rồ",
      excerpt: "Phần thứ 10 của franchise Fast & Furious hứa hẹn sẽ là bom tấn hành động của mùa hè này.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      author: "Đỗ Thanh Tùng",
      date: "10/08/2025",
      readTime: "5 phút đọc",
      category: "premiere",
      views: "11.8K"
    },
    {
      id: 7,
      title: "Lễ hội phim quốc tế Hà Nội 2025: Quy tụ những tác phẩm xuất sắc",
      excerpt: "Sự kiện điện ảnh lớn nhất năm sẽ diễn ra từ ngày 20-27/08 với sự tham gia của nhiều ngôi sao quốc tế.",
      image: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/11/7/z6010226395568b1b913c4f8ec1e5460f6f9eacdd32c47-1730994577866142761413.jpg",
      author: "Ngô Thị Mai",
      date: "09/08/2025",
      readTime: "8 phút đọc",
      category: "event",
      views: "7.5K"
    },
    {
      id: 8,
      title: "Đánh giá: Oppenheimer - Kiệt tác điện ảnh của Christopher Nolan",
      excerpt: "Bộ phim tiểu sử về 'cha đẻ bom nguyên tử' là một trong những tác phẩm đáng xem nhất năm nay.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=250&fit=crop",
      author: "Bùi Văn Đức",
      date: "08/08/2025",
      readTime: "9 phút đọc",
      category: "review",
      views: "13.2K"
    },
    {
      id: 9,
      title: "Mai - Phim Việt đầu tiên thu về 100 tỷ đồng trong năm 2025",
      excerpt: "Tác phẩm của đạo diễn Trấn Thành tiếp tục khẳng định sức hút của điện ảnh Việt Nam.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=250&fit=crop",
      author: "Hoàng Thị Bích",
      date: "07/08/2025",
      readTime: "4 phút đọc",
      category: "premiere",
      views: "18.7K"
    }
  ];

  const trendingTopics = [
    { name: "Avatar 3", count: "25.8K bài viết" },
    { name: "Marvel Phase 5", count: "18.3K bài viết" },
    { name: "Phim Việt 2025", count: "12.1K bài viết" },
    { name: "Oscar 2025", count: "9.7K bài viết" },
    { name: "Netflix Original", count: "15.2K bài viết" }
  ];

  const filteredNews = activeCategory === "all" 
    ? newsData 
    : newsData.filter(news => news.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r mt-15 from-blue-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              🎬 Tin tức điện ảnh
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Cập nhật những tin tức mới nhất về thế giới điện ảnh Việt Nam và quốc tế
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured News */}
            <div className="mb-12">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
                      🔥 Tin nổi bật
                    </span>
                    <span className="text-sm opacity-90">{featuredNews.views} lượt xem</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">
                    {featuredNews.title}
                  </h2>
                  <p className="text-lg opacity-90 mb-6 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✍️</span>
                      </div>
                      <div>
                        <div className="font-semibold">{featuredNews.author}</div>
                        <div className="text-sm opacity-75">{featuredNews.date} • {featuredNews.readTime}</div>
                      </div>
                    </div>
                    <button className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-200">
                      Đọc tiếp →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredNews.map((news) => (
                <article key={news.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        news.category === 'premiere' ? 'bg-red-100 text-red-700' :
                        news.category === 'review' ? 'bg-yellow-100 text-yellow-700' :
                        news.category === 'interview' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {categories.find(cat => cat.id === news.category)?.icon} {categories.find(cat => cat.id === news.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{news.views} lượt xem</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {news.author.split(' ').pop().charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{news.author}</div>
                          <div className="text-xs text-gray-500">{news.date} • {news.readTime}</div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Đọc thêm →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                Tải thêm tin tức 📰
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🔥</span>
                Chủ đề hot
              </h3>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        #{index + 1} {topic.name}
                      </div>
                      <div className="text-sm text-gray-500">{topic.count}</div>
                    </div>
                    <div className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📈'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📧 Đăng ký nhận tin</h3>
              <p className="text-blue-100 mb-6">
                Cập nhật những tin tức điện ảnh mới nhất qua email
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-blue-900 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Đăng ký ngay ✨
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Thống kê</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tổng bài viết</span>
                  <span className="font-bold text-blue-600">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lượt xem hôm nay</span>
                  <span className="font-bold text-green-600">45.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Người đăng ký</span>
                  <span className="font-bold text-purple-600">12.8K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bình luận</span>
                  <span className="font-bold text-orange-600">8.5K</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">🌐 Theo dõi chúng tôi</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  📘 Facebook
                </button>
                <button className="flex items-center justify-center py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  📸 Instagram
                </button>
                <button className="flex items-center justify-center py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  ▶️ YouTube
                </button>
                <button className="flex items-center justify-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  💬 Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}