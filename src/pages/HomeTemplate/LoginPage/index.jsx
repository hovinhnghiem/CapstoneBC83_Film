import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { loginApi } from '../../../services/auth.api';
import { setUser } from '../../../store/auth.slice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (valuesNhanTuHandleLogin) => loginApi(valuesNhanTuHandleLogin),
    onSuccess: (user) => {
      if (!user) return // Nếu không có user sẽ không làm gì hết
      localStorage.setItem("user", JSON.stringify(user)); // Lưu local storage
      dispatch(setUser(user)) // Lưu lên store để chia sẽ dữ liệu với các component khác 
      
      navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin/dashboard" : "/")
    },
    onError: () => {
      alert("Login failed")
    }
  })

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnchange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(values)
    // try {
    //   const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
    //   console.log("⚡️ ~ handleSubmit ~ response:", response);
    //   const user = response.data.content;
    // if (user) {
    //   localStorage.setItem("user", JSON.stringify(user));
    //   if (user.maLoaiNguoiDung === "QuanTri") {
    //     navigate("/admin/dashboard");
    //   } else {
    //     navigate("/");
    //   }
    // }
    // } catch (error) {
    //   console.log("⚡️ ~ handleSubmit ~ error:", error);
    // }
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && user.maLoaiNguoiDung === "QuanTri") {
  //     return <Navigate to="/admin/dashboard" />;
  //   }
  //   if (user && user.maLoaiNguoiDung !== "QuanTri") {
  //     return <Navigate to="/" />;
  //   }
  // }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin/dashboard" />;
  }
  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-6">Login Page</h1>
      <form className="w-96 space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Tài khoản"
          className="p-3 rounded-lg border w-full"
          name="taiKhoan"
          onChange={handleOnchange}
          value={values.taiKhoan}
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          className="p-3 rounded-lg border w-full"
          name="matKhau"
          onChange={handleOnchange}
          value={values.matKhau}
        />
        <div className="flex justify-end">
          <button
            disabled={isPending}
            className="p-3 bg-green-600 text-white rounded-lg">{isPending ? "Đang đăng nhập..." : "Đăng nhập"} </button>
        </div>
      </form>
    </div>
  );
}
