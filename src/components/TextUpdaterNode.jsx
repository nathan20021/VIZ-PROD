import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TextUpdaterNode({ data }) {
  const [inputString, setInputString] = useState(data.value);
  const [fontSize, setFontSize] = useState(11);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const toolBarState = useSelector((state) => state.toolBarState);
  const CurrentTextNodeID = useSelector((state) => state.currentTextNodeId);
  const currentKeyPressed = useSelector((state) => state.userControlState.currentKey);
  const dispatch = useDispatch();

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
  }, [toolBarState.italic]);
  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setUnderline(toolBarState.underline)
      : void 0;
  }, [toolBarState.underline]);
  useEffect(() => {
    setInputString((prev) => {
      if(currentKeyPressed !== undefined && CurrentTextNodeID === data.nodeId){
        console.log("hahaah")
        if(currentKeyPressed.toLowerCase() === "backspace"){
          return prev.slice(0, -1)
        }
        if(currentKeyPressed.length === 1){
          return prev + currentKeyPressed
        }
      }
      return prev
    })
  }, [currentKeyPressed])
  return (
    <div
      style={{
        width: isBold
          ? inputString.length * (fontSize / 2) + 20
          : inputString.length * (fontSize / 2) + 15,
      }}
      className="text-updater-node"
      onClick={() => {
        dispatch({ type: "SET_FONT", payload: fontSize });
        dispatch({ type: "SET_BOLD", payload: isBold });
        dispatch({ type: "SET_ITALIC", payload: isItalic });
        dispatch({ type: "SET_UNDERLINE", payload: isUnderline });
      }}
    >
      <div
        className=" text-center flex flex-col font-base min-w-[1rem] min-h-[0.7rem]"
        id={`textUpdater|${data.nodeId}`}
        style={{
          fontSize: fontSize,
          fontWeight: isBold ? "bold" : "normal",
          boxSizing: "border-box",
          backgroundColor: CurrentTextNodeID == data.nodeId ? "white" : "transparent",
          border: CurrentTextNodeID == data.nodeId ? "black solid 1px" : "transparent solid 1px"
        }}
      >
        <h2
          id={`textUpdater|${data.nodeId}`}
          style={{
            fontStyle: isItalic ? "oblique" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
        >
          {inputString}
        </h2>
      </div>
    </div>
  );
}

export default TextUpdaterNode;
