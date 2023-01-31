import React, { useEffect, useRef, useState } from "react";
import { UserType } from "../../../../context/collection";
import { useClickOutside } from "../../../../hooks/useClickOutside";

type Props = {
  fileRef: React.RefObject<HTMLInputElement>;
  user: UserType;
};

export default function Avatar({ fileRef, user }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setIsOpen(false));

  function handleClickFileInput() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  return (
    <div className="flex-1 relative">
      <div className="relative ml-10">
        <img
          src={
            user
              ? user.is_google_auth
                ? user.img_path
                : user.base_url + user.img_path
              : ""
          }
          alt="@ronrix"
          className="rounded-full w-1/2"
        />
        <div
          className="text-grayish bg absolute bottom-0 left-0 bg-primary-black px-2 py-1 border border-grays rounded-md cursor-pointer font-thin"
          onClick={() => setIsOpen((prev) => !prev)}
          ref={ref}
        >
          <i className="fa-solid fa-pen text-grayish mr-2"></i>
          edit
        </div>
        {isOpen && (
          <div className="bg-box-primary border border-grays w-auto absolute -bottom-24 py-2 text-grayish after:content-[''] after:-top-2 after:left-2 after:w-3 after:h-3 after:border-t after:border-l after:border-grays rounded after:absolute after:bg-box-primary after:rotate-45 drop-shadow-xl">
            <div
              className="hover:bg-dark-green py-1 px-4 text-grayish cursor-pointer"
              onClick={handleClickFileInput}
            >
              Upload photo
            </div>
            <div className="hover:bg-dark-green py-1 px-4 text-grayish cursor-pointer">
              Set to default
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
