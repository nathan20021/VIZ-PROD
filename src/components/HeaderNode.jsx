import React, { useState, useCallback } from "react";

function HeaderNode({ data }) {
  const [inputString, setInputString] = useState("TEXT");
  const onChange = useCallback((e) => {
    setInputString(e.target.value);
  });

  return (
    <div
      style={{
        width: inputString.length * 13 + 15,
      }}
      className="text-updater-node"
    >
      <div className=" text-center flex flex-col text-xl font-semibold ">
        <input
          className="text-center"
          id="text"
          name="text"
          onChange={onChange}
          value={inputString}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default HeaderNode;
