import React from "react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";

type Props = {
  name: string;
  required: {};
  placeholder: string;
  errorMsg: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  type?: string;
  register: any;
};

export default function Input({
  name,
  required,
  placeholder,
  errorMsg,
  error,
  type,
  register,
}: Props) {
  return (
    <>
      <input
        {...register(name, required)}
        className="border p-3 my-2 bg-slate-100 focus:bg-white rounded-lg"
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <p className="text-red-600 text-left text-xs m-2 mt-0">{errorMsg}</p>
      )}
    </>
  );
}
