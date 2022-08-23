import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TextUpdaterNode({ data }) {
  const [inputString, setInputString] = useState(data.value);
  const [fontSize, setFontSize] = useState(11);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
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
  }, [toolBarState.italic]);
  useEffect(() => {
    CurrentTextNodeID === data.nodeId
      ? setUnderline(toolBarState.underline)
      : void 0;
  }, [toolBarState.underline]);
  useEffect(() => {
    if (CurrentTextNodeID == null) {
      setReadOnly(true);
    }
  }, [CurrentTextNodeID]);
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
        className=" text-center flex flex-col font-base "
        style={{
          fontSize: fontSize,
          fontWeight: isBold ? "bold" : "normal",
        }}
      >
        <input
          onDoubleClick={() => {
            setReadOnly(false);
          }}
          onKeyDown={(e) => {
            !readOnly && e.code == "Enter" ? setReadOnly(true) : void 0;
          }}
          style={{
            fontStyle: isItalic ? "oblique" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            userSelect: "none",
          }}
          className="text-center bg-transparent"
          id={`textUpdater|${data.nodeId}`}
          name="text"
          readOnly={readOnly}
          onChange={onChange}
          value={inputString}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default TextUpdaterNode;
