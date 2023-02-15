import React from "react";
import { URL_COLLECTIONS_TYPE } from "../../context/collection";

type Props = {
  handleShowModal: () => void;
  collection: URL_COLLECTIONS_TYPE;
  img_url: string;
};

export default function CollectionModal({
  handleShowModal,
  collection,
  img_url,
}: Props) {
  function handleCancelEditedCollection() {
    console.log("cancelling...");
  }
  function handleSaveCollection() {
    console.log("saving...");
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center"
      onClick={handleShowModal}
    >
      <div
        className="w-full md:w-700 rounded-lg bg-secondary-black text-white p-5 flex flex-col md:flex-row relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn | icon */}
        <i
          onClick={handleShowModal}
          className="fa-solid fa-xmark text-grays text-sm absolute right-0 top-0 rounded-full p-2 hover:text-grayish cursor-pointer"
        ></i>

        <div className="md:mr-5 flex-1">
          <img src={img_url} alt="website thumbnail" className="w-100" />
        </div>

        <div className="flex-1 break-words overflow-x-hidden mt-5 md:mt-0">
          <h3 className="text-grayish font-bold text-lg uppercase">{collection.name}</h3>
          <p className="text-grays">{collection.details}</p>

          <h4 className="text-grayish mt-3">Original URL</h4>
          <p className="text-grays text-xs underline text-justify w-full">
            {collection.original_url}
          </p>

          <h4 className="text-grayish mt-3">Short URL</h4>
          <div className="flex justify-between text-xs">
            <p className="text-grays underline">
              {import.meta.env.VITE_BASE_URL + collection.short_url}
            </p>
            <a href="" className="text-grays cursor-pointer group">
              <i className="fa-solid fa-arrow-up-right-from-square mr-2 text-grays group-hover:text-grayish"></i>
              <span className="group-hover:text-grayish text-grays">visit</span>
            </a>
          </div>

          <div className="flex items-center justify-end mt-5">
            <button
              className="px-3 py-1 text-grayish"
              onClick={handleCancelEditedCollection}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-grayish bg-dark-green rounded-lg"
              onClick={handleSaveCollection}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
