import React from "react";
import DropDown from "./Dropdown";

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
const AwsResources = ({ awsRes, searchTerm }) => {
  const filterSearchTerm = (names) => {
    return removeDashes(names).toLowerCase().includes(searchTerm.toLowerCase());
  };
  return (
    <div className="w-full z-50">
      {Object.keys(awsRes).map((key, index) => {
        return (
          <div key={index}>
            {awsRes[key].filter(filterSearchTerm).length !== 0 ? (
              <DropDown
                name={key}
                services={awsRes[key].filter(filterSearchTerm)}
                isArch={false}
              />
            ) : (
              void 0
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AwsResources;
