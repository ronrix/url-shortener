import React, { useState } from "react";
import Auth from "../auth/Auth";

export default function Header() {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center shadow p-2">
      <h1 className="font-bold text-1xl">URL Shortener</h1>
      <input
        type="submit"
        value="login"
        className="border rounded-lg p-2 hover:bg-sky-500 hover:text-white hover:border-transparent"
        onClick={() => setShowLoginForm(!showLoginForm)}
      />
      {showLoginForm && <Auth closeForm={setShowLoginForm} />}
    </div>
  );
}
