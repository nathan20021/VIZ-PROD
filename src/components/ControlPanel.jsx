import React, { useState } from "react";
import { IoText, IoSave } from "react-icons/io5";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { BiUndo, BiRedo } from "react-icons/bi";
import { FaBold } from "react-icons/fa";
import { FiUnderline, FiItalic } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from "react-icons/md";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const textTool = useSelector((state) => state.toolBarState.textTool);
  const fontSize = useSelector((state) => state.toolBarState.fontSize);
  const [headerTool, setHeaderTool] = useState(false);
  const commonStyle = "flex justify-center items-center gap-3 text-xs";
  return (
    <div className="bg-[#eeeeee] w-full h-full flex justify-start gap-3">
      <div id="undo-redo-section" className={`${commonStyle} text-base`}>
        <BiUndo />
        <BiRedo />
      </div>
      <div
        id="font-styling-section"
        className="flex justify-center items-center"
      >
        <button
          onClick={() => {
            dispatch({ type: "INCREASE_FONT" });
          }}
        >
          +
        </button>
        <input
          size={3}
          className="text-sm text-center"
          type="text"
          value={`${fontSize}`}
        />
        <button
          onClick={() => {
            dispatch({ type: "DECREASE_FONT" });
          }}
        >
          -
        </button>
      </div>
      <div id="text-styling-section" className={commonStyle}>
        <FaBold />
        <FiItalic />
        <FiUnderline />
        <AiOutlineLock />
      </div>
      <div id="alight-section" className={commonStyle}>
        <MdAlignVerticalTop />
        <MdAlignVerticalBottom />
        <MdAlignHorizontalCenter />
        <MdAlignHorizontalLeft />
        <MdAlignVerticalCenter />
        <MdAlignHorizontalRight />
      </div>
    </div>
  );
};

export default ControlPanel;
