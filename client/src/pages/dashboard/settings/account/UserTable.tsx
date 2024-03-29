import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordModal from "../../../../components/modals/ChangePasswordModal";
import Notif from "../../../../components/modals/Notif";
import UploadAvatarModal from "../../../../components/modals/UploadAvatarModal";
import { updateProfileSchema } from "../../../../config/schema";

import { UserType } from "../../../../context/collection";
import Avatar from "./Avatar";
import InfoInput from "./InfoInput";

type Props = {
  user: UserType;
  handleUserAvatar: (url: string) => void;
};

export default function UserTable({ user, handleUserAvatar }: Props) {
  // get user data to display into DOM
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<{ msg: string; status: number }>();
  const [showChangePassModal, setShowChangePassModal] =
    useState<boolean>(false);
  const [cropModal, setShowCropModal] = useState<boolean>(false);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setShowCropModal(true);
      });
    }
  }

  function handleSetResMsg(data: { msg: string; status: number }) {
    setResMsg(data);
    handleSetShowNotif();
  }

  function handleSetShowNotif() {
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  }

  function onSubmit(data: any) {
    console.log(data);

    fetch(import.meta.env.VITE_BACKEND_URL + "update-profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          handleSetResMsg(data);
          handleSetShowNotif();
        }
      })
      .catch((err) => console.log(err));
  }

  function handleShowPasswordModal() {
    setShowChangePassModal(true);
  }

  function handleClosePasswordModal() {
    setShowChangePassModal(false);
  }

  function handleCloseCropModal() {
    setShowCropModal(false);
  }

  return (
    <>
      {showNotif && <Notif resMsg={resMsg} />}
      {showChangePassModal && (
        <ChangePasswordModal handleCloseModal={handleClosePasswordModal} />
      )}

      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="flex justify-start align-center flex-col md:flex-row">
          <div className="w-full md:w-1/2 order-last md:order-first">
            <InfoInput
              register={register}
              labelName="Username"
              inputValue={user && user.username}
              note="You can change your usernam but make sure that this is unique"
            />
            <InfoInput
              register={register}
              labelName="Email"
              inputValue={user && user.email}
              note="By changing your email, you have to make sure that your email is
            verified. This email will be your account security when your
            password has been compromised."
            />
            <button
              type="button"
              className="text-light-green mt-3"
              onClick={() => handleShowPasswordModal()}
            >
              Change password
            </button>
          </div>
          <Avatar fileRef={fileRef} user={user} />
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onInput={handleSelectFile}
          />
        </div>

        <input
          type="submit"
          value="Update profile"
          className="mt-5 px-4 py-1 bg-dark-green rounded-md font-thin cursor-pointer hover:bg-light-green text-grayish"
        />
        <p className="text-xs text-grays mt-2">
          You won't see the changes until you{" "}
          <span
            className="text-grayish cursor-pointer"
            onClick={() => window.location.reload()}
          >
            reload
          </span>{" "}
          the page
        </p>
      </form>

      {cropModal && (
        <UploadAvatarModal
          handleSetResMsg={handleSetResMsg}
          imageSrc={imageSrc}
          handleCloseCropModal={handleCloseCropModal}
          handleSetAvatar={handleUserAvatar}
        />
      )}
    </>
  );
}
