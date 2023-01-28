import React from "react";
import UserTable from "./UserTable";

export default function Account() {
  return (
    <div className="">
      <h4 className="text-grayish font-bold">Account Settings</h4>
      <p className="text-grays text-sm">You personal account</p>
      <div className="mt-3">
        <UserTable />
      </div>
    </div>
  );
}
