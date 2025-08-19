import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../../services/api"
import { FaEdit, FaTrash, FaEye, FaRegCalendarAlt } from "react-icons/fa";
import DeleteMovie from "../DeleteMovie"; // Import component xoá
import SetCalendarFilm from '../SetCalendarFilm';
export default function MovieManagement() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await api.get('/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=100')
        setMovies(response.data.content.items || [])
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    getMovies()
  }, [])

  const handleAddMovie = () => {
    navigate("/admin/movies-management/add-movie")
  }

  const handleSetCalendar = (movie) => {
    navigate(`/admin/movies-management/setcalendar/${movie.maPhim}`);
  };

  return (
    <div className='space-y-4'>
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400">
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
              <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400">Movie Management</a>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-semibold text-gray-900">Movie Management</h1>
        <button
          className="px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={handleAddMovie}
        >
          Add movie
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 to-purple-600 shadow">
            <tr>
              <th className="px-6 py-3">Movie name</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Descriptions</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Services</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.maPhim} className="border border-gray-200 shadow-xl">
                <td className="px-6 py-4 font-medium text-gray-900 w-[250px]">{movie.tenPhim}</td>
                <td className="px-6 py-4">
                  <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-24 h-32 object-cover" />
                </td>
                <td className="px-6 py-4 w-[320px] line-clamp-2">{movie.moTa}</td>
                <td className="px-6 py-4">{format(movie.ngayKhoiChieu, 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4">{movie.sapChieu ? 'Coming soon' : 'Now showing'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/movies-management/edit-movie/${movie.maPhim}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                    <DeleteMovie
                      maPhim={movie.maPhim}
                      onDeleted={(deletedId) =>
                        setMovies((prev) => prev.filter((m) => m.maPhim !== deletedId))
                      }
                    />
                    <button
                      onClick={() => handleSetCalendar(movie)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaRegCalendarAlt size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
