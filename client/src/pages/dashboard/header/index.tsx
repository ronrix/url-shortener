import { useAnimationFrame } from "framer-motion";
import React from "react";

type Props = {
  user: { username: string; img_path: string };
};

export default function Header({ user }: Props) {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="text-white flex items-center">
        <img
          src="../../src/assets/logo.svg"
          alt="profile pic"
          className="w-10 rounded-full"
        />
        <span className="text-white ml-2">GoShort</span>
      </div>
      <div className="flex">
        <div className="flex flex-col items-end">
          <h4 className="text-white font-bold">{user.username}</h4>
          <span className="text-grays text-xs">Super Admin</span>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden ml-5">
          <img
            src={user.img_path || `../../src/assets/images/myself.jpg`}
            alt="profile pic"
            className="w-10"
          />
        </div>
      </div>
    </nav>
  );
}
