import React, { useState } from "react";
import { motion } from "framer-motion";

import Auth from "../../auth/Auth";

export default function Header() {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <motion.img
          src={"../../src/assets/logo.svg"}
          alt="logo"
          className="mr-2 "
        />
        <a
          href="/"
          className="font-bold text-darky-gray hover:text-light-gray text-2xl"
        >
          GoShort
        </a>
      </div>
      <motion.input
        whileHover={{
          y: -1.2,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
        initial={{ y: 1 }}
        type="submit"
        value="login"
        className="rounded py-2 px-4 hover:bg-light-green text-white bg-dark-green capitalize font-bold"
        onClick={() => setShowLoginForm(!showLoginForm)}
      />
      {showLoginForm && <Auth closeForm={setShowLoginForm} />}
    </div>
  );
}
