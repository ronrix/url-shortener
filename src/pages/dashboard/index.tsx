import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AddCollection from "../../components/modals/AddCollection";
import Header from "./header";
import Navs from "./navs";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState<boolean>(true);

  function handleToggleAddCollectionModal() {
    setShowAddModal((prev) => !prev);
  }
  return (
    <div className="bg-primary-black h-screen">
      <div className="container mx-auto">
        <Header />

        {/* body */}
        <div className="mt-10 p-5">
          <h1 className="text-light-gray font-bold text-4xl">Main Dashboard</h1>
          <Navs
            handleToggleAddCollectionModal={handleToggleAddCollectionModal}
          />
          <div className="mt-10">
            <Outlet />
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
  );
}
