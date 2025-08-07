import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import { useParams } from "react-router-dom";
import { getMovieDetailsApi } from '../../../services/movie.api';


export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const { data: movie , isLoading , isError } = useQuery({
    queryKey: ["movie-details", movieId], // ["movie-details" , 1] , ["movie-details" , 2] ,  ["movie-details" , 3] 
    queryFn: () => getMovieDetailsApi(movieId),
    enabled: !!movieId // Boolean(movieId)
  })

  return (
    <div className="container mx-auto">
     
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <img src={movie?.hinhAnh} className="w-full h-64 object-cover rounded-md shadow-2xl" alt={movie?.biDanh} />
        </div>
        <div className="col-span-5 space-y-4">
          <h1 className="text-2xl font-bold">Tên phim: {movie?.tenPhim}</h1>
          <p className="text-lg">Mô tả: {movie?.moTa}</p>
          <p className="text-lg">Ngày chiếu: {movie?.ngayKhoiChieu ? format(movie.ngayKhoiChieu, "dd/MM/yyyy") : ""}</p>
        </div>
      </div>
    </div>
  );
}
