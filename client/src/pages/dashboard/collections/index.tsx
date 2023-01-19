import React from "react";
import { collections, Col } from "../../../config/collections";
import Collection from "./Collection";

export default function Collections() {
  return (
    <div className="text-white grid mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
      {collections.map((collection) => {
        return collection.map((c: Col) => {
          return (
            <Collection
              key={c.id}
              collection_details={c.collection_details}
              collection_image_path={c.img_url}
              collection_name={c.collection_name}
            />
          );
        });
      })}
    </div>
  );
}
