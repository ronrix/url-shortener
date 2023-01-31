import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../api/signout";
import { UserType } from "../../../context/collection";
import { useClickOutside } from "../../../hooks/useClickOutside";

export default function Header() {
  const [showSignOutBtn, setSignOutBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserType>();

  useClickOutside(ref, () => setSignOutBtn(false));

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/dashboard", {
        method: "GET",
        credentials: "include",
      });
      const user = await response.json();
      setUser(user);
    })();
  }, []);

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
          <h4 className="text-white font-bold">{user && user.username}</h4>
          <span className="text-grays text-xs">Super Admin</span>
        </div>
        <div
          className="w-10 h-10 rounded-full overflow-hidden ml-5 border-2 border-primary-black outline outline-grayish cursor-pointer"
          onClick={() => setSignOutBtn((prev) => !prev)}
          ref={ref}
        >
          <img
            src={
              (user && user.base_url + "/" + user.img_path) ||
              `../../src/assets/images/myself.jpg`
            }
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
