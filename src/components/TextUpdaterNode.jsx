import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TextUpdaterNode({ data }) {
  const [inputString, setInputString] = useState(data.value);
  const [fontSize, setFontSize] = useState(11);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const toolBarState = useSelector((state) => state.toolBarState);
  const CurrentTextNodeID = useSelector((state) => state.currentTextNodeId);
  const dispatch = useDispatch();

  const onChange = useCallback((e) => {
    setInputString(e.target.value);
  });
  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setFontSize(toolBarState.fontSize)
      : void 0;
  }, [toolBarState.fontSize]);
  useEffect(() => {
    CurrentTextNodeID === data.nodeId ? setBold(toolBarState.bold) : void 0;
  }, [toolBarState.bold]);
  useEffect(() => {
    CurrentTextNodeID === data.nodeId ? setItalic(toolBarState.italic) : void 0;
    console.log(isItalic);
  }, [toolBarState.italic]);
  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setUnderline(toolBarState.underline)
      : void 0;
  }, [toolBarState.underline]);
  return (
    <div
      style={{
        width: inputString.length * (fontSize / 2) + 15,
      }}
      className="text-updater-node"
      onClick={() => {
        dispatch({ type: "SET_FONT", payload: fontSize });
        dispatch({ type: "SET_BOLD", payload: isBold });
        dispatch({ type: "SET_ITALIC", payload: isItalic });
        dispatch({ type: "SET_UNDERLINE", payload: isUnderline });
        dispatch({ type: "SET_CURRENT_NODE_ID", payload: data.nodeId });
      }}
    >
      <div
        className=" text-center flex flex-col font-base "
        style={{
          fontSize: fontSize,
          fontWeight: isBold ? "bold" : "normal",
        }}
      >
        <input
          style={{
            fontStyle: isItalic ? "oblique" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
          className="text-center bg-transparent"
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
