import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  handleToggleAddCollectionModal: () => void;
};

export default function AddCollection({
  handleToggleAddCollectionModal,
}: Props) {
  const { register, handleSubmit } = useForm();

  function onSubmit() {
    console.log("submitting...");
  }

  return (
    <div className="fixed w-100 h-100 top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center">
      <form
        className="w-320 rounded-lg bg-secondary-black text-white p-5 flex flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-lg text-white font-bold">New Collection</div>
        <label className="text-white my-2 w-full">
          Original URL
          <input
            {...register("original_url", { required: true })}
            className="rounded w-full p-2 text-primary-black block outline-none"
          />
        </label>
        <label className="text-white my-2 w-full">
          Prefix
          <input
            {...register("prefix", { required: true })}
            className="rounded w-full p-2 text-primary-black block"
          />
        </label>
        <div className="w-full mt-3">
          <button
            onClick={() => console.log("generating...")}
            className="bg-light-gray p-2 rounded"
          >
            Generate
          </button>
          <span className="text-grayish text-sm ml-4">Random short url</span>
          <p className="bg-tersiary-black text-grayish w-full p-2 text-sm mt-2 rounded">
            https://goshort.com/dump
          </p>
        </div>
        <div className="text-white self-end mt-5">
          <button
            onClick={handleToggleAddCollectionModal}
            className="text-sm text-grayish cursor-pointer"
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Save"
            className="bg-dark-green p-2 rounded ml-5 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
