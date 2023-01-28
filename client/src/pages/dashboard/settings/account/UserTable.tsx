import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "../../../../config/schema";

import { CollectionContext, ContextType } from "../../../../context/collection";
import Avatar from "./Avatar";
import InfoInput from "./InfoInput";

export default function UserTable() {
  // get user data to display into DOM
  const { user } = useContext<ContextType>(CollectionContext);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  function handleShowPasswordModal() {
    alert("showing modal");
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex justify-start align-center">
        <div className="w-1/2">
          <InfoInput
            register={register}
            labelName="Username"
            inputValue={user.username}
            options={{ required: true, minLength: 8 }}
            note="You can change your usernam but make sure that this is unique"
          />
          <InfoInput
            register={register}
            labelName="Email"
            inputValue={user.email}
            options={{ required: true, email: true }}
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
    </form>
  );
}
