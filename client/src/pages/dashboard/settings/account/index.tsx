import React, { useState } from "react";

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
      <p className="text-grays text-sm">
        You can change your username and password here.
      </p>
      <div className="mt-5 text-grayish flex justify-between items-center">
        <table className="w-full">
          <tr>
            <td className="text-grayish font-bold">Username</td>
          </tr>
          <tr>
            <td className="text-grayish">ronrix</td>
            <td>
              <span className="text-dark-green cursor-pointer">edit</span>
            </td>
          </tr>
          <tr>
            <td className="text-grayish font-bold">Password</td>
          </tr>
          <tr>
            <td className="text-grayish">*********</td>
            <td>
              <span className="text-dark-green cursor-pointer">edit</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
