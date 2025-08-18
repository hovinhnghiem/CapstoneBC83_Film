import api from './api';

export const loginApi =  async (values) =>{
  //values : { taiKhoan: "" , matKhau: ""}
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
    return response.data.content
  } catch (error) {
      console.log('🔥 ~ loginApi ~ error:', error)
  }
}