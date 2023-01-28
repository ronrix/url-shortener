import React from "react";

type Props = {
  icon: string;
  text: string;
  active: boolean;
  appendClass?: string;
  handleActiveNav: (e: React.MouseEvent<HTMLDivElement>) => void;
  id: string;
};

export default function Nav({
  icon,
  text,
  active,
  appendClass,
  handleActiveNav,
  id,
}: Props) {
  return (
    <div
      id={id}
      onClick={(e) => handleActiveNav(e)}
      className={`${
        active && "border-2 border-primary-black outline outline-dark-green"
      } bg-secondary-black p-5 flex flex-col items-center justify-center rounded-lg w-28 cursor-pointer shadow ${appendClass}`}
    >
      <i className={`${icon} text-grayish text-lg`}></i>
      <span className="text-grayish mt-2 text-sm">{text}</span>
    </div>
  );
}
