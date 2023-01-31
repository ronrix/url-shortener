import React, { useCallback, useEffect, useState } from "react";
import { UserType } from "../../../../context/collection";
import UserTable from "./UserTable";

export default function Account() {
  const [user, setUser] = useState<UserType>();

  function handleUserAvatar(url: string) {
    const updated_user = { ...user, img_path: url };
    setUser(updated_user as UserType);
  }

  const handleFetch = useCallback(async () => {
    const response = await fetch("http://localhost:8000/dashboard", {
      method: "GET",
      credentials: "include",
    });
    const user = await response.json();
    console.log(user);
    setUser(user);
  }, []);

  useEffect(() => {
    console.log("in here...");
    handleFetch();
  }, [handleFetch]);

  return (
    <div className="">
      <h4 className="text-grayish font-bold">Account Settings</h4>
      <p className="text-grays text-sm">You personal account</p>
      <div className="mt-3">
        <UserTable
          user={user as UserType}
          handleUserAvatar={handleUserAvatar}
        />
      </div>
    </div>
  );
}
