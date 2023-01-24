import React from "react";

type Props = {
  handleShowModal: () => void;
};

export default function CollectionModal({ handleShowModal }: Props) {
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
        className="w-full md:w-700 rounded-lg bg-secondary-black text-white p-5 flex flex-col md:flex-row"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="md:mr-5 flex-1">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D20210104144959%26focal%3Dnone%26tmtime%3D20210104145035&f=1&nofb=1&ipt=6802a1bdbfdf6f9a7af4bf1b250e5e39a81331e178c231839db35457770da71c&ipo=images"
            alt="website thumbnail"
            className="w-100"
          />
        </div>

        <div className="flex-1 break-words overflow-x-hidden mt-5 md:mt-0">
          <h3 className="text-grayish font-bold text-lg">
            Tailwind CSS Breakpoints
          </h3>
          <p className="text-grays">
            Note: Learn more about breakpoints in Tailwind CSS
          </p>

          <h4 className="text-grayish mt-3">Original URL</h4>
          <p className="text-grays text-xs underline text-justify w-full">
            https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D20210104144959%26focal%3Dnone%26tmtime%3D20210104145035&f=1&nofb=1&ipt=6802a1bdbfdf6f9a7af4bf1b250e5e39a81331e178c231839db35457770da71c&ipo=images
          </p>

          <h4 className="text-grayish mt-3">Short URL</h4>
          <div className="flex justify-between text-xs">
            <p className="text-grays underline">
              https://goshort.com/u/short-url
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
