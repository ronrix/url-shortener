import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  text: string;
  style?: string;
};

export default function SolidButton({ text, style }: Props) {
  const navigate = useNavigate();
  return (
    <div className={style}>
      <motion.div
        custom={Link}
        onClick={() => navigate("/register")}
        className="bg-secondary-black p-3 text-white font-bold rounded hover:bg-primary-black inline-block cursor-pointer"
      >
        {text}
      </motion.div>
    </div>
  );
}
