import React, { useState, useEffect } from "react";

const imgs = [
  "../../src/assets/images/website-1.jpg",
  "../../src/assets/images/website-2.jpg",
  "../../src/assets/images/website-3.jpg",
];

export default function Section() {
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index >= imgs.length - 1) {
        setIndex(-1);
      }

      setIndex((curr) => curr + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="flex bg-grayish rounded-lg p-14 shadow items-start justify-between">
      <div className="flex-1">
        <img src={imgs[index]} alt="websites" className="w-700 rounded-lg" />
      </div>

      <div className="flex-1 ml-20">
        <h2 className="font-bold text-5xl mb-8">Easy Access</h2>
        <p className="leading-relaxed text-grays">
          You can auto generate the short url or you can also customize your own
          short url names. Build it with ease and in synchronize to your likings
          without any disruptive and confusing parameters
        </p>
      </div>
    </section>
  );
}
