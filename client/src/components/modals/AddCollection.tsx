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
    fetch("http://localhost:8000/save-collection", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    console.log("submitting...");
  }

  function generateShortUrl() {
    fetch("http://localhost:8000/generate-short-url", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ generatedUrl, status }) => {
        if (status === 200) {
          console.log(generatedUrl);
        }
      })
      .catch((err) => console.log(err));
    console.log("generating...");
  }

  return (
    <div className="fixed w-100 h-100 top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center">
      <form
        className="w-320 rounded-lg bg-secondary-black text-white p-5 flex flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-lg text-white font-bold">
          Create New Collection
        </div>
        <label className="text-white my-2 w-full">
          Original URL
          <p className="text-grays mb-2 text-xs">
            paste the url you want to be shorten
          </p>
          <input
            {...register("original_url", { required: true })}
            className="rounded w-full p-2 text-primary-black block outline-none"
          />
        </label>
        <label className="text-white my-2 w-full">
          Short URL <span className="text-grayish text-xs">(optional)</span>
          <p className="text-grays mb-2 text-xs">Add your own short url</p>
          <input
            {...register("prefix", { required: true })}
            className="rounded w-full p-2 text-primary-black block outline-none"
          />
        </label>
        <div className="w-full mt-3">
          <button
            onClick={generateShortUrl}
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
