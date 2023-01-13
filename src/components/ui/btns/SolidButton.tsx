import React from "react";

type Props = {
  text: string;
  style?: string;
};

export default function SolidButton({ text, style }: Props) {
  return (
    <div className={style}>
      <a
        href="/register"
        className="bg-secondary-black p-3 text-white font-bold rounded hover:bg-primary-black"
      >
        {text}
      </a>
    </div>
  );
}
