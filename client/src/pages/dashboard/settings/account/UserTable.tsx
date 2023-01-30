import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordModal from "../../../../components/modals/ChangePasswordModal";
import Notif from "../../../../components/modals/Notif";
import { updateProfileSchema } from "../../../../config/schema";

import { CollectionContext, ContextType } from "../../../../context/collection";
import Avatar from "./Avatar";
import InfoInput from "./InfoInput";

export default function UserTable() {
  // get user data to display into DOM
  const { user } = useContext<ContextType>(CollectionContext);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<{ msg: string; status: number }>();
  const [showChangePassModal, setShowChangePassModal] =
    useState<boolean>(false);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  function onSubmit(data: any) {
    console.log(data);

    fetch("http://localhost:8000/update-profile", {
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
          setShowNotif(true);
          setResMsg(data);

          setTimeout(() => setShowNotif(false), 2000);
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
              inputValue={user.username}
              note="You can change your usernam but make sure that this is unique"
            />
            <InfoInput
              register={register}
              labelName="Email"
              inputValue={user.email}
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
          <Avatar />
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
    </>
  );
}
