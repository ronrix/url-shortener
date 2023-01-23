import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AddCollection from "../../components/modals/AddCollection";
import { CollectionContext } from "../../context/collection";
import Header from "./header";
import Navs from "./navs";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<[]>([]);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    img_path: string;
  }>({ username: "", img_path: "" });

  const navigate = useNavigate();

  function handleToggleAddCollectionModal() {
    setShowAddModal((prev) => !prev);
  }

  useEffect(() => {
    // fetch all the url collections
    // set the loading to false after getting and passing all the requirements to request to a protected route
    fetch("http://localhost:8000/dashboard", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async ({ data, status }) => {
        setIsLoading(false);
        if (status === 200) {
          setUserInfo(data[0]);
        }

        return fetch("http://localhost:8000/get-collections", {
          method: "GET",
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.length) {
          setCollection(data);
        }
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/login");
      });
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <img
            src="../../src/assets/loading.gif"
            alt="loading animation"
            className="w-40"
          />
        </div>
      ) : (
        <div className="bg-primary-black min-h-screen">
          <div className="container mx-auto">
            <Header user={userInfo} />

            {/* body */}
            <div className="mt-10 p-5">
              <h1 className="text-light-gray font-bold text-4xl">
                Main Dashboard
              </h1>
              <Navs
                handleToggleAddCollectionModal={handleToggleAddCollectionModal}
              />
              <div className="mt-10">
                <CollectionContext.Provider value={collection}>
                  <Outlet />
                </CollectionContext.Provider>
              </div>
            </div>

            {/* modal */}
            {showAddModal && (
              <AddCollection
                handleToggleAddCollectionModal={handleToggleAddCollectionModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
