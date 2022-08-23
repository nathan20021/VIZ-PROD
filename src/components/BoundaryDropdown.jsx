import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import dataJson from "../utils/boundary-icon.json";

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

const BoundaryDropdown = () => {
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
        Boundary Components
      </div>
      <div
        className={
          open
            ? "visible flex justify-start p-3 flex-wrap gap-3 duration-300 z-50 select-none"
            : "hidden duration-300 z-50 select-none"
        }
      >
        {Object.keys(dataJson).map((key, index) => {
          return (
            <div key={key} id={`${key}|boundaryGrab`}>
              <div
                id={`${key}|boundaryGrab`}
                style={{
                  borderColor: dataJson[key].color,
                  background:
                    dataJson[key].bgColor === "none"
                      ? ``
                      : `${dataJson[key].bgColor}`,
                  borderStyle: dataJson[key].dashed ? `dashed` : `solid`,
                }}
                className={`w-12 h-12 relative border-[1px] box-content cursor-pointer`}
              >
                <div
                  id={`${key}|boundaryGrab`}
                  style={{
                    borderColor: dataJson[key].color,
                    backgroundImage:
                      dataJson[key].url !== "none"
                        ? `url(${dataJson[key].url})`
                        : ``,
                    backgroundSize: "contain",
                  }}
                  className="absolute w-5 h-5 border-[1px] -left-[1px] -top-[1px] box-borders"
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoundaryDropdown;
