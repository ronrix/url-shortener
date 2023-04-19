import React, { useEffect, useState } from "react";
import { URL_COLLECTIONS_TYPE } from "../../context/collection";
import Notif from "./Notif";

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
  const [edit, setEdit] = useState<{
    collection_name: boolean;
    collection_details: boolean;
    original_url: boolean;
  }>({
    collection_name: false,
    collection_details: false,
    original_url: false,
  });
  const [collectionInputs, setCollectionInputs] = useState<{
    collection_name: string;
    collection_details: string;
    original_url: string;
  }>({
    collection_name: collection.name,
    collection_details: collection.details,
    original_url: collection.original_url,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<{ msg: string; status: number }>();

  const [isUpdatedCollections, setUpdatedCollections] = useState<boolean>(
    () =>
      !(
        collection.details.trim() ===
          collectionInputs.collection_details.trim() &&
        collection.name === collectionInputs.collection_name.trim() &&
        collection.original_url.trim() === collectionInputs.original_url.trim()
      )
  );

  function handleCancelEditedCollection() {
    // revert back to orginal values
    setCollectionInputs({
      collection_name: collection.name,
      collection_details: collection.details,
      original_url: collection.original_url,
    });
    setUpdatedCollections(false);
  }

  async function handleSaveCollection() {
    // TODO: send updated collection to the server and update it
    setIsLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "edit-collection",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ ...collectionInputs, id: collection.id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      setResMsg(data);
      setShowNotif(true);
      setUpdatedCollections(false);
      setIsLoading(false);

      // update the state collection value with the new one
      collection.details = collectionInputs.collection_details;
      collection.name = collectionInputs.collection_name;
      collection.original_url = collectionInputs.original_url;

      setTimeout(() => {
        setShowNotif(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  function makeEditable(
    e: React.MouseEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) {
    setEdit({ ...edit, [e.currentTarget.id]: true });
  }

  function handleBlur(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
    setEdit({ ...edit, [e.target.name]: false });
  }

  function handleInputs(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCollectionInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // this checks if the inputs changes value so we can display the buttons
  useEffect(() => {
    setUpdatedCollections(
      () =>
        !(
          collection.details.trim() ===
            collectionInputs.collection_details.trim() &&
          collection.name.trim() === collectionInputs.collection_name.trim() &&
          collection.original_url.trim() ===
            collectionInputs.original_url.trim()
        )
    );
  }, [isUpdatedCollections, collectionInputs]);

  return (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center'
      onClick={handleShowModal}
    >
      {showNotif && <Notif resMsg={resMsg} />}
      <div
        className='w-full md:w-700 rounded-lg bg-secondary-black text-white p-5 flex flex-col md:flex-row relative'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn | icon */}
        <i
          onClick={handleShowModal}
          className='fa-solid fa-xmark text-grays text-sm absolute right-0 top-0 rounded-full p-2 hover:text-grayish cursor-pointer'
        ></i>

        <div className='md:mr-5 flex-1'>
          <img src={img_url} alt='website thumbnail' className='w-100' />
        </div>

        <div className='flex-1 break-words overflow-x-hidden mt-5 md:mt-0'>
          {edit.collection_name ? (
            <textarea
              autoFocus
              name='collection_name'
              onChange={handleInputs}
              onBlur={handleBlur}
              className='font-bold text-lg uppercase w-full bg-transparent mb-2 text-grayish border border-grays outline-none max-h-[100px] min-h-[80px]'
              defaultValue={collectionInputs.collection_name}
            ></textarea>
          ) : (
            <h3
              id='collection_name'
              onClick={makeEditable}
              className='text-grayish font-bold text-lg uppercase'
            >
              {collectionInputs.collection_name}
            </h3>
          )}
          {edit.collection_details ? (
            <textarea
              autoFocus
              name='collection_details'
              onChange={handleInputs}
              onBlur={handleBlur}
              className='text-lg w-full bg-transparent mb-2 text-grayish border border-grays outline-none max-h-[100px] min-h-[80px]'
              defaultValue={collectionInputs.collection_details}
            ></textarea>
          ) : (
            <p
              id='collection_details'
              className='text-grays'
              onClick={makeEditable}
            >
              {collectionInputs.collection_details}
            </p>
          )}

          <h4 className='text-grayish mt-3'>Original URL</h4>
          {edit.original_url ? (
            <textarea
              autoFocus
              name='original_url'
              onChange={handleInputs}
              onBlur={handleBlur}
              className='text-lg w-full bg-transparent mb-2 text-grayish border border-grays outline-none max-h-[100px] min-h-[40px]'
              defaultValue={collectionInputs.original_url}
            ></textarea>
          ) : (
            <p
              id='original_url'
              onClick={makeEditable}
              className='text-grays text-xs underline text-justify w-full'
            >
              {collectionInputs.original_url}
            </p>
          )}

          <h4 className='text-grayish mt-3'>Short URL</h4>
          <div className='flex justify-between text-xs'>
            <p className='text-grays underline'>
              {import.meta.env.VITE_BACKEND_URL + collection.short_url}
            </p>
            <a
              href={
                import.meta.env.VITE_BACKEND_URL + "u/" + collection.short_url
              }
              className='text-grays cursor-pointer group'
            >
              <i className='fa-solid fa-arrow-up-right-from-square mr-2 text-grays group-hover:text-grayish'></i>
              <span className='group-hover:text-grayish text-grays'>visit</span>
            </a>
          </div>

          {isUpdatedCollections ? (
            <div className='flex items-center justify-end mt-5'>
              <button
                className='px-3 py-1 text-grayish'
                onClick={handleCancelEditedCollection}
              >
                Cancel
              </button>
              <button
                className={`px-3 py-1 text-grayish rounded-lg flex ${
                  isLoading ? "bg-grays" : "bg-dark-green "
                }`}
                onClick={handleSaveCollection}
                disabled={isLoading}
              >
                {isLoading && (
                  <img
                    src={"../../src/assets/loading.gif"}
                    alt='loading animation'
                    className='w-5 mr-2'
                  />
                )}
                Save
              </button>
            </div>
          ) : null}

          <p className='text-xs text-grays text-center mt-5'>
            Note: clicking the text will let you edit it
          </p>
        </div>
      </div>
    </div>
  );
}
