import React, { useEffect, useRef } from "react";
import mapping from "../utils/aws-icon.json";
import DropDown from "./Dropdown";
import { useMeasure } from "react-use";

const SideBar = () => {
  const sideBarHeight = useRef(0);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    sideBarHeight.current = Math.max(sideBarHeight.current, height);
  });

  return (
    <div className="relative w-full z-50 min-h-screen">
      <div ref={ref} className="absolute w-full z-50">
        {Object.keys(mapping).map((key, index) => {
          return (
            <div key={index}>
              <DropDown name={key} services={mapping[key]} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          height: sideBarHeight.current,
          minHeight: "100vh",
          width: "100%",
          zIndex: 50,
          backgroundColor: "rgb(252 254 255)",
        }}
      ></div>
    </div>
  );
};

export default SideBar;
