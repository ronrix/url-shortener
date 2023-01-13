import React, { useState, useEffect } from "react";

import Left from "./Left";
import BigWindow from "./BigWindow";
import SmallWindow from "./SmallWindow";

const text_typing_animation = "https://goshort.com/chatgpt";
const sample_short_version_of_urls = `{
    "/chatgpt": "chat.openai.com/chat",
    "/tailwind-breakpoints": "https://tailwindcss.com/docs",
    "/project-1": "https://github.com/ronrix/portfolio-v2",
    "/project-2": "https://github.com/ronrix/product-dashboard",
}`;

export default function MainSection() {
  const [index, setIndex] = useState<number>(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  useEffect(() => {
    // this setTimeout is for typing animation that has 0.2s display
    const timeout = setTimeout(() => {
      if (index === text_typing_animation.length) {
        setStartAnimation(true);
        return;
      }

      setIndex(index + 1);
    }, 200);

    // this setTimeout is for displaying the animation for 1sec before it fades out
    const delayTimeout = setTimeout(() => {
      if (index === text_typing_animation.length) {
        setStartAnimation(false);
        setIndex(0);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [index]);

  return (
    <div className="flex mt-14 w-100 flex-col desktop:flex-row desktop:w-large max-w-large desktop:px-20 mx-auto items-center md:items-start">
      <Left />

      <section className="p-5 relative">
        <BigWindow
          index={index}
          text_typing_animation={text_typing_animation}
          sample_short_version_of_urls={sample_short_version_of_urls}
          startAnimation={startAnimation}
        />
        <SmallWindow startAnimation={startAnimation} />
      </section>
    </div>
  );
}
