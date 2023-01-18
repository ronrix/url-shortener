import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  handleToggleAddCollectionModal: () => void;
};

export default function Navs({ handleToggleAddCollectionModal }: Props) {
  const [activeNav, setActiveNav] = useState<string>("collections");

  function handleActiveNav(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setActiveNav(e.currentTarget.id);
  }
  return (
    <div className="flex justify-between mt-5 items-center">
      <div className="w-80 flex justify-between">
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
      <i
        className="fa-solid fa-circle-plus text-light-gray text-lg cursor-pointer"
        onClick={handleToggleAddCollectionModal}
      ></i>
    </div>
  );
}
