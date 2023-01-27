import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";

import App from "./App";
import "./index.css";
import NotFound from "./errors/NotFound";
import Dashboard from "./pages/dashboard";
import Collections from "./pages/dashboard/collections";
import Settings from "./pages/dashboard/settings";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// get the cookie user
const isAuthenticated = Cookies.get("c_user");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />,
  },
  {
    path: "/register",
    element: !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Collections />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
