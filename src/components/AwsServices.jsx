import React from "react";
import awsSer from "../utils/aws-icon.json";
import DropDown from "./Dropdown";

const AwsServices = () => {
  return (
    <div className="absolute w-full z-50">
      {Object.keys(awsSer).map((key, index) => {
        return (
          <div key={index}>
            <DropDown name={key} services={awsSer[key]} isArch={true} />
          </div>
        );
      })}
    </div>
  );
};

export default AwsServices;
