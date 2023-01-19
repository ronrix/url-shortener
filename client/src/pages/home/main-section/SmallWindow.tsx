import React from "react";
import { motion } from "framer-motion";

type Props = {
  startAnimation: boolean;
  img_path: string;
};

export default function SmallWindow({ startAnimation, img_path }: Props) {
  return (
    <div className="absolute bg-white mobile:w-small w-400 desktop:w-400 max-w-400 min-h-small h-small rounded-lg -right-10 bottom-10 shadow-lg">
      {/* top  */}
      <div className="absolute top-0 left-0 right-0 w-100 h-8 bg-gradient-to-t from-light-gray to-grayish rounded-t-lg flex items-center p-2">
        <div className="w-5 h-5 bg-red-500 rounded-full"></div>
        <div className="w-5 h-5 bg-yellow-500 rounded-full mx-1"></div>
        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
      </div>
      {startAnimation && (
        <motion.div
          className="p-2 mt-8"
          animate={{
            y: [-22, 0],
            opacity: 1,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          initial={{ opacity: 0 }}
        >
          <motion.img src={img_path} alt="website" />
        </motion.div>
      )}
    </div>
  );
}
