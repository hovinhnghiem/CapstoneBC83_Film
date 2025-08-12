import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../../services/api"
import DeleteUser from '../DeleteUser'
import FindUser from "../FindUser";


export default function UserManagement() {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  //   const [loading, setLoading] = useState(false)
  //   const [error, setError] = useState(null)
  console.log('🔥 ~ MovieManagement ~ movies:', users)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get('/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&soTrang=1&soPhanTuTrenTrang=100')
        setUsers(response.data.content || []);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    getUsers()
  }, [])

  const handleAddMovie = () => {
    navigate("/admin/users-management/add-user")
  }

  const handleSearchResult = (data) => {
    setUsers(data || []);
  };
  return (
    <div className='space-y-4'>
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
              <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">User Management</a>
            </div>
          </li>

        </ol>
      </nav>

      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
        {/* Thanh tìm kiếm */}
        <FindUser onSearchResult={handleSearchResult} />



        <button className="px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800" onClick={handleAddMovie}>
          Add user
        </button>

      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tài khoản
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>

              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Loại người dùng
              </th>
              <th scope="col" className="px-6 py-3">
                Services
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.taiKhoan} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white w-[250px]">
                  {index + 1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white w-[250px]">
                  {user.taiKhoan}
                </th>
                <td className="px-6 py-4">
                  {user.hoTen}
                </td>
                <td className="px-6 flex-col justify-center items-start py-4">
                  <p className='w-[320px] line-clamp-2'>{user.email}</p>
                </td>

                <td className="px-6 py-4">
                  {user.soDT}
                </td>
                <td className="px-6 py-4">
                  {user.maLoaiNguoiDung} {/**? 'QuanTri' : 'KhachHang' */}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                  onClick={() => navigate(`/admin/users-management/edit/${user.taiKhoan}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                  <DeleteUser
                    taiKhoan={user.taiKhoan}
                    onDeleted={(deletedAccount) =>
                      setUsers((prev) => prev.filter((u) => u.taiKhoan !== deletedAccount))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}
