import React, { useState } from "react";
import UserTable from "./UserTable";

export default function Account() {
  const [username, setUsername] = useState<{
    editable: boolean;
    value: string;
  }>({ editable: false, value: "" });
  const [password, setPassword] = useState<{
    editable: boolean;
    value: string;
  }>({ editable: false, value: "" });

  return (
    <div className="">
      <h4 className="text-grayish font-bold">Account Settings</h4>
      <p className="text-grays text-sm">You personal account</p>
      <div className="mt-3 text-grayish flex justify-between items-center">
        <UserTable />
      </div>
    </div>
  );
}
