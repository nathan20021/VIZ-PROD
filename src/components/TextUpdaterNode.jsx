import React, { useRef, useState, useCallback, useEffect } from "react";

function TextUpdaterNode({ data }) {
  const [inputString, setInputString] = useState(data.value);
  const onChange = useCallback((e) => {
    setInputString(e.target.value);
  });

  return (
    <div
      style={{
        width: inputString.length * 6 + 15,
      }}
      className="text-updater-node"
    >
      <div className=" text-center flex flex-col text-[0.5rem] font-base ">
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

export default TextUpdaterNode;
