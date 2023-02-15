import React, { useEffect, useRef, useState } from "react";
import Notif from "../../../../components/modals/Notif";
import { UserType } from "../../../../context/collection";
import { useClickOutside } from "../../../../hooks/useClickOutside";

type Props = {
  fileRef: React.RefObject<HTMLInputElement>;
  user: UserType;
};

export default function Avatar({ fileRef, user }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<{ msg: string; status: number }>();

  useClickOutside(ref, () => setIsOpen(false));

  function handleClickFileInput() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  async function handleSetAvatarToDefault(e: any) {
    e.stopPropagation();
    setIsLoading(true);
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "set-avatar-to-default",
      { method: "GET", credentials: "include" }
    );
    const data = await response.json();
    setResMsg(data);

    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
      setShowNotif(true);

      setTimeout(() => {
        setShowNotif(false);
      }, 1000);
    }, 1000);
  }

  return (
    <>
      {showNotif && <Notif resMsg={resMsg} />}
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
              <div
                onClick={handleSetAvatarToDefault}
                className={`hover:bg-dark-green py-1 px-4 cursor-pointer flex ${
                  isLoading ? "text-grays" : "text-grayish "
                }`}
              >
                {isLoading && (
                  <img
                    src={"../src/assets/loading.gif"}
                    alt="loading animation"
                    className="w-5 mr-2"
                  />
                )}
                Set to default
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
