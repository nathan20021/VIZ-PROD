import React, { useEffect, useRef, useState } from "react";
import AwsResources from "./AwsResources";
import AwsServices from "./AwsServices";
import { useMeasure } from "react-use";

const SideBar = () => {
  const sideBarHeight = useRef(0);
  const [ref, { height }] = useMeasure();
  const [isArch, setIsArch] = useState(true);

  useEffect(() => {
    sideBarHeight.current = Math.max(sideBarHeight.current, height);
  });

  return (
    <div className="relative w-full z-40 min-h-screen">
      <div className="res-arch-switch flex text-base justify-around">
        <div
          className={
            isArch
              ? `py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
              : `py-1 w-1/2 flex justify-center items-center hover:cursor-pointer hover:bg-[#dcdcdc] duration-300 `
          }
          onClick={() => {
            !isArch ? setIsArch(true) : void 0;
          }}
        >
          Services
        </div>
        <div
          className={
            !isArch
              ? `py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
              : `py-1 w-1/2 flex justify-center items-center hover:cursor-pointer hover:bg-[#dcdcdc] duration-300 `
          }
          onClick={() => {
            isArch ? setIsArch(false) : void 0;
          }}
        >
          Resources
        </div>
      </div>
      <div ref={ref}>{isArch ? <AwsServices /> : <AwsResources />}</div>
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
