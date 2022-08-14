import React, { useEffect, useRef, useState } from "react";
import mapping from "../utils/aws-icon.json";
import awsRes from "../utils/aws-icon-res.json";
import DropDown from "./Dropdown";
import { useMeasure } from "react-use";

const SideBar = () => {
  const sideBarHeight = useRef(0);
  const [ref, { height }] = useMeasure();
  const [isArch, setIsArch] = useState(true);

  useEffect(() => {
    sideBarHeight.current = Math.max(sideBarHeight.current, height);
  });

  return (
    <div className="relative w-full z-50 min-h-screen ">
      <div className="res-arch-switch flex text-base justify-around">
        <div
          className={
            isArch
              ? `py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
              : `py-1 w-1/2 flex justify-center items-center hover:cursor-pointer `
          }
          onClick={() => {
            !isArch ? setIsArch(true) : void 0;
          }}
        >
          AWS Services
        </div>
        <div
          className={
            !isArch
              ? `py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
              : `py-1 w-1/2 flex justify-center items-center hover:cursor-pointer `
          }
          onClick={() => {
            isArch ? setIsArch(false) : void 0;
          }}
        >
          Resources
        </div>
      </div>
      <div ref={ref}>
        {isArch ? (
          <div className="absolute w-full z-50">
            {Object.keys(mapping).map((key, index) => {
              return (
                <div key={index}>
                  <DropDown
                    name={key}
                    services={mapping[key]}
                    isArch={isArch}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="absolute w-full z-50">
            {Object.keys(awsRes).map((key, index) => {
              return (
                <div key={index}>
                  <DropDown name={key} services={awsRes[key]} isArch={isArch} />
                </div>
              );
            })}
          </div>
        )}
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
