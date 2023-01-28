import React from "react";

type Props = {
  labelName: string;
  inputValue: string;
  note: string;
};

export default function InfoInput({ labelName, inputValue, note }: Props) {
  return (
    <label className="text-grayish font-bold block mt-2">
      {labelName}
      <input
        type="text"
        value={inputValue}
        className="px-2 py-1 bg-transparent border border-grays outline-none focus:border-light-green rounded-md text-grayish block w-full font-thin"
      />
      <p className="text-grays text-xs mt-2">{note}</p>
    </label>
  );
}
