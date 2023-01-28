import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../api/signout";
import { useClickOutside } from "../../../hooks/useClickOutside";

type Props = {
  user: { username: string; img_path: string };
};

export default function Header({ user }: Props) {
  const [showSignOutBtn, setSignOutBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setSignOutBtn(false));

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
      <div className="flex relative">
        <div className="flex flex-col items-end">
          <h4 className="text-white font-bold">{user.username}</h4>
          <span className="text-grays text-xs">Super Admin</span>
        </div>
        <div
          className="w-10 h-10 rounded-full overflow-hidden ml-5 border-2 border-primary-black outline outline-grayish cursor-pointer"
          onClick={() => setSignOutBtn((prev) => !prev)}
          ref={ref}
        >
          <img
            src={user.img_path || `../../src/assets/images/myself.jpg`}
            alt="profile pic"
            className="w-10"
          />
          {showSignOutBtn && (
            <div
              className="p-2 text-grayish text-xs absolute bg-secondary-black -bottom-9 right-0"
              onClick={() => signout(navigate)}
            >
              sign out
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
