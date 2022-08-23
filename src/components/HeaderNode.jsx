import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

function HeaderNode({ data }) {
  const headerTitle = useSelector((state) => state.headerTitle);
  const dispatch = useDispatch();
  const onChange = useCallback((e) => {
    dispatch({
      type: "SET_Header",
      payload: e.target.value,
    });
  });

  return (
    <div
      style={{
        width: headerTitle.length * 13 + 15,
      }}
      className="text-updater-node"
    >
      <div className=" text-center flex flex-col text-xl font-semibold">
        <input
          className="text-center bg-transparent"
          id="text"
          name="text"
          onChange={onChange}
          value={headerTitle}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default HeaderNode;
