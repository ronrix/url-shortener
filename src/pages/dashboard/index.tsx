import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Navs from "./navs";

export default function Dashboard() {
  return (
    <div className="bg-primary-black h-screen">
      <div className="container mx-auto">
        <Header />

        {/* body */}
        <div className="mt-10 p-5">
          <h1 className="text-light-gray font-bold text-4xl">Main Dashboard</h1>
          <Navs />
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
