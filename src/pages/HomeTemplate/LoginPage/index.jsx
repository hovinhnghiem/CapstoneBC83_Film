import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginApi } from "../../../services/auth.api";
import { setUser } from "../../../store/auth.slice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  useEffect(() => {
    if (user) {
      if (user.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (userData) => {
      if (!userData) return;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
      if (userData.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: () => {
      alert("Sai tài khoản hoặc mật khẩu!");
    },
  });

  const handleOnChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-6">Login Page</h1>
      <form className="w-96 space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Tài khoản"
          className="p-3 rounded-lg border w-full"
          name="taiKhoan"
          onChange={handleOnChange}
          value={values.taiKhoan}
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          className="p-3 rounded-lg border w-full"
          name="matKhau"
          onChange={handleOnChange}
          value={values.matKhau}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      </form>
    </div>
  );
}
