import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  handleToggleAddCollectionModal: () => void;
};

export default function Navs({ handleToggleAddCollectionModal }: Props) {
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
      <i
        className="fa-solid fa-circle-plus text-light-gray text-lg cursor-pointer"
        onClick={handleToggleAddCollectionModal}
      ></i>
    </div>
  );
}
