import React, { useContext } from "react";
import { Col } from "../../../config/collections";
import { CollectionContext } from "../../../context/collection";
import Collection from "./Collection";

export default function Collections() {
  const collection = useContext(CollectionContext);

  return (
    <>
      {collection.length ? (
        <div className="text-white grid mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {collection.map((c: Col) => {
            return (
              <Collection
                key={c.id}
                collection_details={c.collection_details}
                collection_image_path={c.img_url}
                collection_name={c.collection_name}
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
