import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CollectionContext, CollectionType } from "../../context/collection";
import Header from "./header";
import Navs from "./navs";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<CollectionType>(
    {} as CollectionType
  );

  const navigate = useNavigate();
  useEffect(() => {
    // fetch all the url collections
    // set the loading to false after getting and passing all the requirements to request to a protected route
    fetch(import.meta.env.VITE_BACKEND_URL + "get-collections", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data, status, base_url }) => {
        setIsLoading(false);
        // add the base_url to the data collection for rendering
        // add base_url only if data is not null
        if (data) {
          data["base_url"] = base_url;
        }

        if (status === 200) {
          setCollection(data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='h-screen w-screen flex items-center justify-center'>
          <img
            src='../../src/assets/loading.gif'
            alt='loading animation'
            className='w-40'
          />
        </div>
      ) : (
        <div className='bg-primary-black min-h-screen'>
          <div className='container mx-auto'>
            <Header />

            {/* body */}
            <div className='mt-10 p-5'>
              <h1 className='text-light-gray font-bold text-4xl'>
                Main Dashboard
              </h1>
              <Navs />
              <div className='mt-10'>
                <CollectionContext.Provider value={{ collection }}>
                  <Outlet />
                </CollectionContext.Provider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
