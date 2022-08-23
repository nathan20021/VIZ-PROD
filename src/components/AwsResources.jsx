import React from "react";
import awsRes from "../utils/aws-icon-res.json";
import DropDown from "./Dropdown";
const AwsResources = () => {
  return (
    <div className="absolute w-full z-50">
      {Object.keys(awsRes).map((key, index) => {
        return (
          <div key={index}>
            <DropDown name={key} services={awsRes[key]} isArch={false} />
          </div>
        );
      })}
    </div>
  );
};

export default AwsResources;
