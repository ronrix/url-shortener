import React, { useContext } from "react";
import { CollectionContext, ContextType } from "../../../../context/collection";
import Avatar from "./Avatar";
import InfoInput from "./InfoInput";

export default function UserTable() {
  // get user data to display into DOM
  const { user } = useContext<ContextType>(CollectionContext);

  function handleShowPasswordModal() {
    alert("showing modal");
  }

  return (
    <div className="flex justify-start align-center">
      <div className="w-1/2">
        <InfoInput
          labelName="Username"
          inputValue={user.username}
          note="You can change your usernam but make sure that this is unique"
        />
        <InfoInput
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
  );
}
