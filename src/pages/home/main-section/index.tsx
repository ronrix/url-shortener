import React, { useState, useEffect } from "react";

import Left from "./Left";
import BigWindow from "./BigWindow";
import SmallWindow from "./SmallWindow";
import {
  sample_short_version_of_urls,
  windows_data,
  sample_base_url,
} from "../../../config/data";

export default function MainSection() {
  const [index, setIndex] = useState<number>(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [strIdx, setStrIdx] = useState<number>(0);

  const text_typing_urls: string = sample_base_url.concat(
    windows_data[strIdx].path
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index === text_typing_urls.length) {
        setStartAnimation(true);
        return;
      }

      setIndex((prev) => prev + 1);
    }, 100);

    const delayTimeout = setTimeout(() => {
      if (index === text_typing_urls.length) {
        setStartAnimation(false);
        setIndex(0);

        if (strIdx === windows_data.length - 1) {
          setStrIdx(0);
          return;
        }

        setStrIdx((prev) => prev + 1);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [index]);

  return (
    <div className="flex flex-col desktop:flex-row items-center md:items-start">
      <Left />

      <section className="p-5 relative after:content-[''] after:absolute after:w-500 after:h-500 h-500 after:left-0 after:bottom-0 after:-top-0 after:right-0 after:border after:border-light-gray after:rounded-full after:-z-10">
        <BigWindow
          index={index}
          text_typing_urls={text_typing_urls}
          sample_short_version_of_urls={windows_data[strIdx].short_urls}
          startAnimation={startAnimation}
        />
        <SmallWindow
          startAnimation={startAnimation}
          img_path={windows_data[strIdx].img_path}
        />
      </section>
    </div>
  );
}
