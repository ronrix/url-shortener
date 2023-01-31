import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const App = lazy(() => import("./App"));
const NotFound = lazy(() => import("./errors/NotFound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Collections = lazy(() => import("./pages/dashboard/collections"));
const Settings = lazy(() => import("./pages/dashboard/settings"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));

// get the cookie user
const isAuthenticated = Cookies.get("c_user");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading....</div>}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Suspense fallback={<div>loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Suspense fallback={<div>loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Dashboard />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>loading...</div>}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense
            fallback={
              <div className="flex justify-center">
                <img
                  src="../../src/assets/loading.gif"
                  alt="loading animation"
                  className="w-14"
                />
              </div>
            }
          >
            <Collections />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
