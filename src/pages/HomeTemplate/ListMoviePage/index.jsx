import { useQuery } from "@tanstack/react-query";
import { getListMovieApi } from '../../../services/movie.api';
import Movie from "./Movie";




export default function ListMoviePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["list-movie"],
    queryFn: () => {
      return getListMovieApi("GP01") // Trường h api chạy thành công thì hàm getListMovieApi trả về cái gì thì data trong useQuery sẽ nhận cái đó 
    },
  })

  const handleRefetch = ()=> {
    refetch()
  }

  if (isLoading) return <p>Loading...</p>;

  if(isError) return <div>Đã có lỗi xảy ra. Vui lòng thử lại! <button className='p-3 text-sm rounded-sm bg-blue-600 text-white' onClick={handleRefetch}>Thử lại</button></div>

  const renderMovies = () => {
    if (data) {
      return data.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="flex justify-center text-5xl text-red-600 mb-10">Phim Đang Chiếu</h1>
      <div className="grid grid-cols-4 gap-10">{renderMovies()}</div>
    </div>
  );

} 