import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navs() {
  const [activeNav, setActiveNav] = useState<string>("collections");

  function handleActiveNav(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setActiveNav(e.currentTarget.id);
  }
  return (
    <div className="flex justify-between sm:w-80 mt-5">
      <Link
        to=""
        onClick={handleActiveNav}
        id="collections"
        className={`relative text-light-gray ${
          activeNav === "collections"
            ? "after:content=[''] after:absolute after:left-0 after:-bottom-2 after:w-5 after:h-1 after:bg-dark-green"
            : ""
        }`}
      >
        Collections
      </Link>
      <Link
        to="settings"
        onClick={handleActiveNav}
        id="settings"
        className={`relative text-light-gray ${
          activeNav === "settings"
            ? "after:content=[''] after:absolute after:left-0 after:-bottom-2 after:w-5 after:h-1 after:bg-dark-green"
            : ""
        }`}
      >
        Settings
      </Link>
    </div>
  );
}
