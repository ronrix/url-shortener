import React from "react";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { UseFormRegister } from "react-hook-form/dist/types/form";

type Props = {
  labelName: string;
  inputValue: string;
  note: string;
  register: UseFormRegister<FieldValues>;
};

export default function InfoInput({
  labelName,
  inputValue,
  note,
  register,
}: Props) {
  return (
    <label className="text-grayish font-bold block mt-2">
      {labelName}
      <input
        {...register(labelName.toLowerCase())}
        type="text"
        defaultValue={inputValue}
        className="px-2 py-1 bg-transparent border border-grays outline-none focus:border-light-green rounded-md text-grayish block w-full font-thin"
      />
      <p className="text-grays text-xs mt-2">{note}</p>
    </label>
  );
}
