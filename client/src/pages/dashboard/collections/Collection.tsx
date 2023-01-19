import React from "react";

type Props = {
  collection_image_path: string;
  collection_name: string;
  collection_details: string;
};

export default function Collection({
  collection_details,
  collection_image_path,
  collection_name,
}: Props) {
  return (
    <div
      onClick={() => alert("you just clicked me!")}
      className="bg-secondary-black flex rounded-xl items-start justify-start p-5 cursor-pointer"
    >
      <div className="min-w-32 max-w-32 w-32">
        <img src={collection_image_path} alt="" />
      </div>
      <div className="ml-2">
        <h5 className="text-base text-white">{collection_name}</h5>
        <p className="text-xs text-grays">About: {collection_details}</p>
      </div>
    </div>
  );
}
