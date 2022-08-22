import React, { useState } from "react";
import { IoText, IoSave } from "react-icons/io5";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { FaBold } from "react-icons/fa";
import { FiUnderline, FiItalic } from "react-icons/fi";
import { AiOutlineLock, AiFillDelete } from "react-icons/ai";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
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
  const toolBarState = useSelector((state) => state.toolBarState);
  const currentTextNodeId = useSelector((state) => state.currentTextNodeId);
  const commonStyle =
    "button-container flex justify-center items-center gap-3 text-xs p-2 border-x-2";
  return (
    <div className=" w-full h-full flex justify-start gap-3 border-y-2 border-[#eeeeee]">
      <div id="undo-redo-section" className={`${commonStyle} text-base`}>
        <button>
          <IoMdUndo />
        </button>
        <button>
          <IoMdRedo />
        </button>
      </div>
      <div
        id="font-styling-section"
        className="flex justify-center items-center"
      >
        <button
          onClick={() => {
            dispatch({ type: "DECREASE_FONT" });
          }}
        >
          -
        </button>
        <input
          className="text-sm text-center w-10"
          type="number"
          value={toolBarState.fontSize}
          onChange={() => {}}
        />
        <button
          onClick={() => {
            dispatch({ type: "INCREASE_FONT" });
          }}
        >
          +
        </button>
      </div>
      <div id="text-styling-section" className={commonStyle}>
        <button
          onClick={() => {
            dispatch({ type: "SWITCH_BOLD" });
          }}
        >
          <FaBold />
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SWITCH_ITALIC" });
          }}
        >
          <FiItalic />
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SWITCH_UNDERLINE" });
          }}
        >
          <FiUnderline />
        </button>
        <button>
          <AiFillDelete />
        </button>
      </div>
      <button>
        <AiOutlineLock />
      </button>
      <div id="alight-section" className={commonStyle}>
        <button>
          <MdAlignVerticalTop />
        </button>
        <button>
          <MdAlignVerticalBottom />
        </button>
        <button>
          <MdAlignHorizontalCenter />
        </button>
        <button>
          <MdAlignHorizontalLeft />
        </button>
        <button>
          <MdAlignVerticalCenter />
        </button>
        <button>
          <MdAlignHorizontalRight />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
