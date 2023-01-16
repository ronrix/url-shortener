import React, { useState, useEffect, useRef } from "react";
import LazyLoad from "react-lazy-load";
import { useMediaQuery } from "react-responsive";

const imgs = [
  "../../src/assets/images/website-1.jpg",
  "../../src/assets/images/website-2.jpg",
  "../../src/assets/images/website-3.jpg",
];

export default function Section() {
  const [index, setIndex] = useState<number>(-1);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const mobile = useMediaQuery({ minWidth: 569 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
      if (index >= imgs.length - 1) {
        setIndex(-1);
      }

      setIndex((curr) => curr + 1);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="flex flex-col md:flex-row bg-grayish rounded-lg p-14 shadow items-start justify-between">
      <LazyLoad
        height={mobile ? 300 : "auto"}
        className={`bg-light-gray rounded-lg sm:w-500 h-auto border ${
          !startAnimation ? "blur-sm" : "blur-none bg-transparent"
        }`}
      >
        <img
          src={
            !startAnimation
              ? "../../src/assets/images/website-1.jpg"
              : imgs[index]
          }
          alt="websites"
          className="w-100 sm:w-700 rounded-lg"
        />
      </LazyLoad>

      <div className="flex-1 md:ml-20 mt-10 md:mt-0">
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
