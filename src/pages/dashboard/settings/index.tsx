import React, { useState } from "react";
import Account from "./account";
import CollectionSettings from "./collection-settings";
import Nav from "./navs/Nav";

export default function Settings() {
  const [activeNav, setActiveNav] = useState<string>("account");

  function handleActiveNav(e: React.MouseEvent<HTMLDivElement>) {
    setActiveNav(e.currentTarget.id);
  }

  return (
    <div className="flex gap-4 flex-row mobile:flex-col">
      <aside className="flex items-start flex-col mobile:flex-row md:flex-row">
        <Nav
          text="Account"
          icon="fa-solid fa-user"
          active={activeNav === "account" ? true : false}
          handleActiveNav={handleActiveNav}
          id="account"
        />
        <Nav
          text="Collection"
          icon="fa-solid fa-user "
          active={activeNav === "collection" ? true : false}
          appendClass="md:ml-5 mt-5 mobile:mt-0 mobile:ml-5 md:mt-0"
          handleActiveNav={handleActiveNav}
          id="collection"
        />
      </aside>
      <div className="p-5 w-full rounded-lg border border-secondary-black h-full">
        {activeNav === "account" ? <Account /> : <CollectionSettings />}
      </div>
    </div>
  );
}
