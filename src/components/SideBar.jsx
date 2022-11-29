import React, { useState } from "react";
import AwsResources from "./AwsResources";
import AwsServices from "./AwsServices";
import BoundaryDropdown from "./BoundaryDropdown";

import awsSer from "../utils/aws-icon.json";
import awsRes from "../utils/aws-icon-res.json";
import { BiSearch, BiLeftArrow } from "react-icons/bi";

const SideBar = () => {
  const [isArch, setIsArch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative w-full z-40 min-h-max">
      <div className="top-0 sticky z-[99] bg-white ">
        <div className="flex justify-center items-center h-10 text-sm ">
          <div
            className="flex justify-center items-center py-2 w-full h-full"
            id="SearchBar"
          >
            <input
              className="w-[50%] h-full border-2 border-[#000000] indent-3 rounded-l-md text-xs 
            focus:outline-none focus:rounded-l-md focus:border-[#1650b5]"
              autoComplete="off"
              id="SearchBar"
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />
            <div className="w-[10%] h-full bg-black text-white flex justify-center items-center rounded-r-md hover:cursor-pointer">
              <BiSearch />
            </div>
          </div>
          <div></div>
        </div>
        <div className="res-arch-switch flex text-base justify-around border-b-[#f0eeee] border-b-2">
          <div
            className={
              isArch
                ? `text-sm py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
                : `text-sm py-1 w-1/2 flex justify-center items-center hover:cursor-pointer bg-[#f0eeee] hover:bg-[#dcdcdc] duration-300 `
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
                ? `text-sm py-1 w-1/2 flex justify-center items-center bg-[#333333] select-none text-white font-bold `
                : `text-sm py-1 w-1/2 flex justify-center items-center hover:cursor-pointer bg-[#f0eeee] hover:bg-[#dcdcdc] duration-300 `
            }
            onClick={() => {
              isArch ? setIsArch(false) : void 0;
            }}
          >
            Resources
          </div>
        </div>
      </div>

      <div className="min-h-max"></div>
      <div className="min-h-max h-auto">
        {isArch ? (
          <AwsServices awsSer={awsSer} searchTerm={searchTerm} />
        ) : (
          <div className="min-h-max h-auto">
            <BoundaryDropdown />
            <AwsResources awsRes={awsRes} searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
