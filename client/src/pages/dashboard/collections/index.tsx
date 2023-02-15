import React, { useContext, useState } from "react";

import AddCollection from "../../../components/modals/AddCollection";
import {
  CollectionContext,
  ContextType,
  URL_COLLECTIONS_TYPE,
} from "../../../context/collection";
import Collection from "./Collection";

export default function Collections() {
  const { collection } = useContext<ContextType>(CollectionContext);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  function handleToggleAddCollectionModal() {
    setShowAddModal((prev) => !prev);
  }

  return (
    <>
      {/* modal */}
      {showAddModal && (
        <AddCollection
          handleToggleAddCollectionModal={handleToggleAddCollectionModal}
        />
      )}
      <div
        className="text-grayish border border-grays rounded-md p-1 px-2 inline-flex items-center cursor-pointer hover:bg-dark-green duration-75 mb-5"
        onClick={handleToggleAddCollectionModal}
      >
        Add new collection
        <i className="fa-solid fa-circle-plus text-grayish text-lg ml-2"></i>
      </div>
      {collection &&
      collection.url_collections &&
      collection?.url_collections.length ? (
        <div className="text-white grid mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {collection?.url_collections.map((c: URL_COLLECTIONS_TYPE) => {
            return (
              <Collection
                key={c.id}
                collection={c}
                base_url={collection.base_url}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-5">
          <img
            src="../../src/assets/images/out-of-stock.png"
            alt="empty icon"
            className="w-40"
          />
          <p className="text-center text-grayish mt-5">
            You have no collections yet!
          </p>
        </div>
      )}
    </>
  );
}
