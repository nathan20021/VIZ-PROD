import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function TextUpdaterNode({ data }) {
  const [inputString, setInputString] = useState(data.value);
  const [width, setWidth] = useState(0);
  const span = useRef();
  const inputField = useRef();

  const [fontSize, setFontSize] = useState(11);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const toolBarState = useSelector((state) => state.toolBarState);
  const CurrentTextNodeID = useSelector((state) => state.currentTextNodeId);
  const dispatch = useDispatch();

  const changeHandler = evt => {
    setInputString(evt.target.value);
  };

  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setFontSize(toolBarState.fontSize)
      : void 0;
  }, [toolBarState.fontSize]);
  useEffect(() => {
    if (CurrentTextNodeID === data.nodeId) {
      setBold(toolBarState.bold);
    }
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
    setWidth(span.current.offsetWidth);
  }, [inputString, isBold, fontSize]);

  return (
    <div
      className="text-updater-node hover:cursor-text"
      onClick={() => {
        inputField.current.focus();
        dispatch({
          type: "SET_CURRENT_NODE_ID",
          payload: data.nodeId,
        })
        dispatch({ type: "SET_FONT", payload: fontSize });
        dispatch({ type: "SET_BOLD", payload: isBold });
        dispatch({ type: "SET_ITALIC", payload: isItalic });
        dispatch({ type: "SET_UNDERLINE", payload: isUnderline });
      }}
    >
      <div
        className=" text-center flex flex-col font-base min-w-[1rem] min-h-[0.7rem]"
        style={{
          fontSize: fontSize,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "oblique" : "normal",
          textDecoration: isUnderline ? "underline" : "none",
          boxSizing: "border-box",
          border: CurrentTextNodeID == data.nodeId ? "black solid 1px" : "transparent solid 1px"
        }}
      >
        <span 
          className="absolute -z-100 opacity-0 whitespace-pre" 
          ref={span}
          id="text-updater"  
        >
           {inputString} 
        </span>
        <input
          ref={inputField}
          style ={{
            width , 
            backgroundColor: CurrentTextNodeID == data.nodeId ? "white" : "transparent"
          }} 
          className="min-w-1 p-0 focus:outline-none" 
          type="text" 
          value={inputString}
          onChange={changeHandler} 
        />
      </div>
    </div>
  );
}

export default TextUpdaterNode;
