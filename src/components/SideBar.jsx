import React from "react";
import mapping from "../utils/aws-icon.json";
import DropDown from "./Dropdown";
// import { useMeasure } from "react-use";

const SideBar = () => {
  return (
    <div className="relative w-full">

      <div className="absolute w-full">
        {Object.keys(mapping).map((key, index) => {
          return (
            <div key={index}>
              <DropDown name={key} services={mapping[key]} />
            </div>
          );
        })}
      </div>
      <div className={`w-full -z-10 bg-white h-[2520px]`} ></div>
    </div>
  );
};

export default SideBar;
