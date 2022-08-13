import React, { useEffect, useRef } from "react";
import mapping from "../utils/aws-icon.json";
import DropDown from "./Dropdown";
import { useMeasure } from "react-use";

const SideBar = () => {
    const sideBarHeight = useRef(0);
    const [ref, { height }] = useMeasure();

  useEffect(() => {
    sideBarHeight.current = Math.max(sideBarHeight.current, height);
  }, [height]);

  return (
    <div className="relative w-full">
      <div ref={ref} className="absolute w-full">
        {Object.keys(mapping).map((key, index) => {
          return (
            <div key={index}>
              <DropDown name={key} services={mapping[key]} />
            </div>
          );
        })}
      </div>
      <div
        className={`w-full -z-10 bg-white`}
        style={{ height: sideBarHeight.current }}
      ></div>
    </div>
  );
};

export default SideBar;
