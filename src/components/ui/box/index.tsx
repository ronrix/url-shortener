import React from "react";

export default function Box() {
  return (
    <div
      className="shadow-sm p-5 border cursor-pointer"
      onClick={() => alert("You clicked me!")}
    >
      <h3 className="font-bold">Tailwind CSS</h3>
      <p className="text-grays">click to show all generated urls</p>
    </div>
  );
}
