import React from "react";

type Props = {
  isLoading: boolean;
  text: string;
};

export default function SubmitBtn({ isLoading, text }: Props) {
  return (
    <button
      type="submit"
      className={`m-2 bg-sky-500 ${
        !isLoading && "hover:bg-sky-700"
      } font-bold p-3 rounded-3xl`}
      disabled={isLoading}
    >
      {isLoading ? (
        <img
          src="../../src/assets/loading.gif"
          alt="loading gif"
          className="w-5 mx-auto"
        />
      ) : (
        <span className="text-white">{text}</span>
      )}
    </button>
  );
}
