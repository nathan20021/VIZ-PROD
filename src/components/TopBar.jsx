import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const TopBar = () => {
  return (
    <div className="w-full h-full flex">
      <div
        id="left-side"
        className="flex justify-around items-center h-full w-[50%]"
      >
        <div id="logo-container" className="w-6 h-6 bg-red-500"></div>
        <div id="header-option-bar-container " className=" h-full w-[90%]">
          <div id="header-container" className="text-lg">
            <h1>My AWS Diagram</h1>
          </div>
          <div id="menu" className="flex items-center gap-3">
            File,Edit,Insert,Format,Tools, Help
          </div>
        </div>
      </div>
      <div id="right-side" className=""></div>
    </div>
  );
};

export default TopBar;
