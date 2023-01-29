import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { udpatePasswordSchema } from "../../config/schema";

import Input from "../ui/inputs/Input";

type Props = {
  handleCloseModal: () => void;
};

export default function ChangePasswordModal({ handleCloseModal }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(udpatePasswordSchema) });

  function onSubmit(data: any) {
    console.log(data);
    setIsLoading(true);

    // request to 'update-password' route to change the password of the user
    fetch("http://localhost:8000/update-password", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="fixed w-100 h-100 top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center z-20"
      onClick={handleCloseModal}
    >
      <form
        className="w-320 rounded-lg bg-secondary-black text-white p-5 flex flex-col items-start"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg text-white font-bold">Change password</div>
        <label className="text-white my-2 w-full">
          Old password
          <Input
            name="old_password"
            register={register}
            type="password"
            error={errors.old_password?.message}
          />
        </label>
        <label className="text-white my-2 w-full">
          New password
          <Input
            name="new_password"
            register={register}
            type="password"
            error={errors.new_password?.message}
          />
        </label>
        <label className="text-white my-2 w-full">
          Confirm new password
          <Input
            name="confirm_new_password"
            register={register}
            type="password"
            error={errors.confirm_new_password?.message}
          />
        </label>
        <p className="text-grays text-xs text-justify">
          Make sure it's at least 15 characters OR at least 8 characters
          including a number and a lowercase letter.
        </p>
        <div className="flex text-white self-end mt-5">
          <button
            type="submit"
            className={`${
              isLoading ? "bg-grays" : "bg-dark-green"
            } p-2 rounded ml-5 cursor-pointer flex items-center`}
            disabled={isLoading}
          >
            {isLoading && (
              <img
                src={"../../src/assets/loading.gif"}
                alt="loading animation"
                className="w-5 mr-2"
              />
            )}
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}
