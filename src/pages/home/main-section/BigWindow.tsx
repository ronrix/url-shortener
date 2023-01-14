import React from "react";
import { motion } from "framer-motion";

type Props = {
  index: number;
  text_typing_urls: string;
  startAnimation: boolean;
  sample_short_version_of_urls: string;
};

export default function BigWindow({
  index,
  text_typing_urls,
  startAnimation,
  sample_short_version_of_urls,
}: Props) {
  return (
    <div className="w-500">
      <div className="relative bg-secondary-black w-100 h-500 mobile:h-small rounded-lg shadow-lg">
        {/* top  */}
        <div className="absolute top-0 left-0 right-0 w-100 h-8 bg-gradient-to-t from-box-secondary to-box-tersiary rounded-t-lg flex items-center p-2">
          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          <div className="w-5 h-5 bg-yellow-500 rounded-full mx-1"></div>
          <div className="w-5 h-5 bg-green-500 rounded-full"></div>
        </div>
        (
        <motion.div
          transition={{ ease: "easeIn" }}
          key={index}
          className="text-white mt-10 ml-4 tracking-wide inline-block text-sm relative"
        >
          {text_typing_urls.slice(0, index)}
          <div className="bg-light-green px-1 h-4 inline-block self-end"></div>
        </motion.div>
        {/* showing json format of all shortened urls */}
        {startAnimation && (
          <motion.div
            animate={{
              y: [-22, 0],
              opacity: [0, 1],
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
          >
            <pre className="text-white block mt-5 text-xs ml-4">
              {sample_short_version_of_urls}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}
