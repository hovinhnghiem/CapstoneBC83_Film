import HomeTemplate from "../pages/HomeTemplate";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import NewsPage from "../pages/HomeTemplate/NewsPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";

import ProtectedRoute from "./ProtectedRoute";
import { Route } from "react-router-dom";

import AdminTemplate from "../pages/AdminTemplate";
import AddMovie from '../pages/AdminTemplate/AddMovie';
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import MovieManagement from '../pages/AdminTemplate/MovieManagement';

const routes = [
  {
    path: "",
    element: <HomeTemplate />,
    nested: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "list-movie",
        element: <ListMoviePage />,
      },
      {
        path: "movie-details/:movieId",
        element: <MovieDetailsPage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
{
  path: "admin",
  element: <ProtectedRoute><AdminTemplate /></ProtectedRoute>,
  nested: [
    {
      index: true, // ✅ Thêm dòng này để khi vào /admin sẽ load Dashboard
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "add-user",
      element: <AddUserPage />,
    },
    {
      path: "movies-management",
      element: <MovieManagement />,
    },
    {
      path: "movies-management/add-movie",
      element: <AddMovie />,
    },
  ],
},
  {
    path: "auth",
    element: <AuthPage />,
  },
];

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.nested.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
  });
};
