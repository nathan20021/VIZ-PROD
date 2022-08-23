import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const removeDashes = (str) => {
  const replaceAt = function (index, replacement, string) {
    return (
      string.substring(0, index) +
      replacement +
      string.substring(index + replacement.length)
    );
  };
  let result = str;
  for (var i = 0; i < result.length; i++) {
    result.charAt(i) === "-" ? (result = replaceAt(i, " ", result)) : void 0;
    result.charAt(i) === "_" ? (result = replaceAt(i, " ", result)) : void 0;
  }
  return result;
};

const DropDown = ({ name, services, isArch }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full z-50">
      <div
        className="w-full h-8 bg-[#333333] cursor-pointer max-h-max text-sm text-white flex 
                  items-center gap-1 select-none border-b-white border-b-[1px] hover:bg-[#3f3f3f] font-bold"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          className={open ? "ml-3 duration-300 rotate-90" : "ml-3 duration-300"}
        >
          <IoIosArrowForward />
        </div>
        {isArch ? removeDashes(name) : removeDashes(name).split("] ")[1]}
      </div>
      <div
        className={
          open
            ? "visible flex justify-start p-3 flex-wrap gap-3 duration-300 z-50 select-none"
            : "hidden duration-300 z-50 select-none"
        }
      >
        {services.map((value, index) => (
          <div
            draggable={false}
            key={index}
            className="w-7 h-7 cursor-pointer select-none z-50"
          >
            {isArch ? (
              <img
                src={process.env.PUBLIC_URL + `aws-asset/${name}/${value}.png`}
                alt={value}
              />
            ) : (
              <img
                src={
                  process.env.PUBLIC_URL + `aws-asset-res/${name}/${value}.png`
                }
                alt={value}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
