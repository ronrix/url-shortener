import React from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

export default function Input({
  name,
  placeholder,
  type,
  register,
  error,
}: Props) {
  return (
    <>
      <input
        {...register(name)}
        className="border p-3 my-2 bg-slate-100 focus:bg-white rounded-lg"
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <p className="text-red-600 text-left text-xs m-2 mt-0">{`${error}`}</p>
      )}
    </>
  );
}
