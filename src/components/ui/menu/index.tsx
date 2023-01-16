import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Menu() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <motion.div
      animate={show ? "expand" : "minimize"}
      variants={{ expand: { width: "500px" }, minimize: { width: "80px" } }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="bg-secondary-black h-screen overflow-hidden p-2"
    >
      <div
        onClick={() => setShow((prev) => !prev)}
        className="cursor-pointer flex items-center"
      >
        <img src="../../src/assets/logo.svg" alt="goshort logo" />
        <span className="text-white ml-5">GoShort</span>
      </div>
      <div className="mt-10 flex flex-col">
        <Link to="/collections" className="text-white flex items-center py-3">
          <div className="w-14">
            <i className="fa-solid fa-folder-tree text-white text-2xl mr-5 flex-1"></i>
          </div>
          <span className="text-white">Collections</span>
        </Link>
        <Link to="settings" className="text-white flex items-center py-3">
          <div className="w-14">
            <i className="fa-solid fa-sliders text-white text-2xl mr-6 flex-1"></i>
          </div>
          <span className="text-white">Settings</span>
        </Link>
      </div>
    </motion.div>
  );
}
