import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navs() {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between mt-5 items-center">
      <div className="sm:w-80 flex justify-between">
        <Link
          to=""
          id="collections"
          className={`relative text-light-gray ${
            pathname === "/dashboard"
              ? "after:content=[''] after:absolute after:left-0 after:-bottom-2 after:w-5 after:h-1 after:bg-dark-green"
              : ""
          }`}
        >
          Collections
        </Link>
        <Link
          to="settings"
          id="settings"
          className={`relative text-light-gray ml-5 md:ml-0 ${
            pathname === "/dashboard/settings"
              ? "after:content=[''] after:absolute after:left-0 after:-bottom-2 after:w-5 after:h-1 after:bg-dark-green"
              : ""
          }`}
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
