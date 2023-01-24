import React, { useContext, useEffect } from "react";
import {
  CollectionContext,
  ContextType,
  URL_COLLECTIONS_TYPE,
} from "../../../context/collection";
import Collection from "./Collection";

export default function Collections() {
  const collection = useContext<ContextType | undefined>(CollectionContext);

  useEffect(() => {
    console.log(collection?.url_collections.length);
  }, [collection]);

  return (
    <>
      {collection?.url_collections.length === undefined ? (
        <div className="block flex justify-center">
          <img
            src="../../src/assets/loading.gif"
            alt="loading animation"
            className="w-14"
          />
        </div>
      ) : collection?.url_collections.length ? (
        <div className="text-white grid mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {collection?.url_collections.map((c: URL_COLLECTIONS_TYPE) => {
            return (
              <Collection
                key={c.id}
                collection_details={c.details}
                collection_image_path={c.img_url}
                collection_name={c.name}
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
