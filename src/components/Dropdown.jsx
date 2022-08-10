import React, { useState } from "react";
import {IoIosArrowForward} from 'react-icons/io'

const DropDown = ({ name, services }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full">
      <div
        className="w-full h-8 bg-[#323232bd] cursor-pointer max-h-max text-sm text-white flex items-center gap-1 select-none"
        onClick={() => { 
          setOpen(!open);
        }}
      >
        <div className={
          open ? "duration-300 rotate-90" : "duration-300"
        }>
        <IoIosArrowForward/>
        </div>
        {name}
      </div>
      <div
        className={
          open ? "visible flex justify-start flex-wrap gap-3 m-3 duration-300" : "hidden duration-300"
        }
      >
        {services.map((value, index) => (
          <div key={index} className="w-8 h-8">
            <img src={process.env.PUBLIC_URL + `aws-asset/${name}/${value}.png`} alt={value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
