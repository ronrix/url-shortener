import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex items-center justify-between bg-grayish p-10 mt-20">
      <div className="flex items-center">
        <img src={"../../src/assets/logo.svg"} alt="logo" className="mr-2 " />
        <Link to="/" className="text-grays">
          GoShort
        </Link>
      </div>
      <span className="text-grays">&copy; 2023</span>
    </div>
  );
}
