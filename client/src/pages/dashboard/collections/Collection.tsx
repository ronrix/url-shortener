import React, { useState } from "react";
import CollectionModal from "../../../components/modals/CollectionModal";
import { URL_COLLECTIONS_TYPE } from "../../../context/collection";

type Props = {
  collection: URL_COLLECTIONS_TYPE;
  base_url: string;
};

export default function Collection({ collection, base_url }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      {showModal && (
        <CollectionModal
          collection={collection}
          img_url={base_url + collection.img_url + ".png"}
          handleShowModal={handleShowModal}
        />
      )}
      <div
        onClick={handleShowModal}
        className="bg-secondary-black flex rounded-xl items-start justify-start p-5 cursor-pointer"
      >
        <div className="min-w-32 max-w-32 w-32">
          <img src={base_url + collection.img_url + ".png"} alt="" />
        </div>
        <div className="ml-2">
          <h5 className="text-base text-white">{collection.name}</h5>
          <p className="text-xs text-grays">About: {collection.details}</p>
        </div>
      </div>
    </>
  );
}
