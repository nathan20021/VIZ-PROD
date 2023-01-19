import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rgbaToRgbaCSS } from "../utils/functions";
import { useReactFlow } from 'reactflow';

function TextUpdaterNode({ data }) {

  const {setNodes} = useReactFlow();

  const [inputString, setInputString] = useState(data.value);
  const [width, setWidth] = useState(0);
  const span = useRef();
  const inputField = useRef();

  const [fontSize, setFontSize] = useState(11);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const [bgColor, setBgColor] = useState(data.bgColor);
  const [fontColor, setFontColor] = useState(data.fontColor);
  const toolBarState = useSelector((state) => state.toolBarState);
  const CurrentTextNodeID = useSelector((state) => state.currentTextNodeId);
  const dispatch = useDispatch();

  const onChangeTextInput = evt => {
    setInputString(evt.target.value);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === data.nodeId) {
          node.data.value = evt.target.value;
        }
        return node;
      })
    );
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
    CurrentTextNodeID === data.nodeId
      ? setBgColor(toolBarState.bgColor)
      : void 0;
  }, [toolBarState.bgColor]);
  
  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setFontColor(toolBarState.fontColor)
      : void 0;
  }, [toolBarState.fontColor]);
  
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
        // TODO: Combine all these dispatch into one single statement
        dispatch({ type: "SET_FONT", payload: fontSize });
        dispatch({ type: "SET_BOLD", payload: isBold });
        dispatch({ type: "SET_ITALIC", payload: isItalic });
        dispatch({ type: "SET_UNDERLINE", payload: isUnderline });
        dispatch({ type: "SET_BG_COLOR", payload: bgColor });
        dispatch({ type: "SET_FONT_COLOR", payload: fontColor });
        
      }}
    >
      <div
        className="px-2 text-center flex flex-col font-base min-w-[1rem] min-h-[0.7rem]"
        style={{
          fontSize: fontSize,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "oblique" : "normal",
          textDecoration: isUnderline ? "underline" : "none",
          boxSizing: "border-box",
          border: CurrentTextNodeID == data.nodeId ? "black solid 1px" : "transparent solid 1px",
          backgroundColor: rgbaToRgbaCSS(bgColor),
          color: rgbaToRgbaCSS(fontColor)
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
            backgroundColor: "transparent"
          }} 
          className="min-w-1 p-0 focus:outline-none" 
          type="text" 
          value={inputString}
          onChange={onChangeTextInput} 
        />
      </div>
    </div>
  );
}

export default TextUpdaterNode;
