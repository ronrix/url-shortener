import React from "react";
import Box from "../../components/ui/box";
import Menu from "../../components/ui/menu";

export default function Dashboard() {
  return (
    <div className="flex justify-start items-start">
      <Menu />
      <div className="flex gap-4 p-2 flex-wrap justify-center">
        <Box />
        <Box />
        <Box />
        <Box />
      </div>
    </div>
  );
}
