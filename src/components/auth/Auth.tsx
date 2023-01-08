import React from "react";
import { useForm } from "react-hook-form";

interface IProps {
  closeForm: (value: React.SetStateAction<boolean>) => void;
}

const Auth = ({ closeForm }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center">
      <div
        onClick={() => closeForm(false)}
        className="h-full w-full bg-black opacity-50 absolute top-0 left-0"
      ></div>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="z-10 flex flex-col text-center m-4 w-5/12 shadow p-3 rounded bg-white"
      >
        <h4 className="text-2xl font-bold my-4">Sign in</h4>
        <input
          {...register("username", { required: true })}
          className="border p-3 m-2 bg-slate-100 focus:bg-white rounded-3xl"
          placeholder="Email address"
          id="username"
        />
        {errors.username && (
          <p className="text-red-600 text-left text-xs m-2 mt-0">
            Username is required.
          </p>
        )}
        <input
          {...register("password", { required: true, minLength: 8 })}
          className="border p-3 m-2 bg-slate-100 focus:bg-white rounded-3xl"
          placeholder="Password"
          id="password"
        />
        {errors.password && (
          <p className="text-red-600 text-left text-xs m-2 mt-0">
            Password is required.
          </p>
        )}
        <input
          type="submit"
          className="m-2 bg-sky-500 hover:bg-sky-700 font-bold p-3 text-white rounded-3xl"
          value="Sign in"
        />
      </form>
    </div>
  );
};

export default Auth;
