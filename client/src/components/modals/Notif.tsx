import React from "react";
import { motion } from "framer-motion";

type Props = {
  resMsg: { msg: string; status: number } | undefined;
};

export default function Notif({ resMsg }: Props) {
  return (
    <motion.div
      animate={{
        y: 0,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
      initial={{ y: -100 }}
      className={`absolute top-0 left-50 shadow-md py-2 px-5 ${
        resMsg?.status === 200
          ? "bg-grayish text-primary-black"
          : "bg-red-400 text-grayish"
      } rounded-sm`}
    >
      {resMsg?.msg}
    </motion.div>
  );
}
