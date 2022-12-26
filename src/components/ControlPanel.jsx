import React, { useState, useEffect } from "react";
import { IoText } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { FaBold } from "react-icons/fa";
import { FiUnderline, FiItalic } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from "react-icons/md";

import { rgbaToHex } from "../utils/functions";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from '@chakra-ui/react'

import { SketchPicker } from 'react-color';

const ControlPanel = () => {
  const dispatch = useDispatch();
  const toolBarState = useSelector((state) => state.toolBarState);
  const currentTextNodeId = useSelector((state) => state.currentTextNodeId);
  const commonStyle =
    "button-container flex justify-center items-center gap-3 text-xs px-2 border-l-2";
  
  const handleChangeFontColorComplete = (color) => {
    setFontColor(color.rgb);
    dispatch({ type: "SET_FONT_COLOR", payload: color.rgb });

  };
  const handleChangeFontColor = (color) => {
    setFontColor(color.rgb);
  };

  const handleChangeBgColorComplete = (color) => {
    setBgColor(color.rgb);
    dispatch({ type: "SET_BG_COLOR", payload: color.rgb });
  };
  const handleChangeBgColor = (color) => {
    setBgColor(color.rgb);
  };
  
  const [fontColor, setFontColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  })
  
  const [bgColor, setBgColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  })

    useEffect(() => {
    if (currentTextNodeId === null) {
      dispatch({ type: "SET_BOLD", payload: false });
      dispatch({ type: "SET_ITALIC", payload: false });
      dispatch({ type: "SET_UNDERLINE", payload: false });
    }
  }, [currentTextNodeId]);

  return (
    <div className=" w-full h-full flex justify-start border-y-2 border-[#eeeeee]">
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
        className="button-container flex justify-center items-center gap-3 text-xs border-l-2 text-base"
      >
        <button
          className="hover:bg-[#aaaaaa] p-[0.3rem]"
          onClick={() => {
            dispatch({ type: "DECREASE_FONT" });
          }}
        >
          <BiMinus />
        </button>
        <input
          className="text-sm text-center w-10"
          type="number"
          value={toolBarState.fontSize}
          onChange={() => {}}
        />
        <button
          className="hover:bg-[#aaaaaa] p-[0.3rem]"
          onClick={() => {
            dispatch({ type: "INCREASE_FONT" });
          }}
        >
          <BiPlus />
        </button>
      </div>
      <div id="text-styling-section" className={commonStyle}>
        <button
          className={currentTextNodeId === null ? `` : `hover:bg-[#aaaaaa]`}
          style={{
            padding: "0.4rem",
            backgroundColor: toolBarState.bold ? `#aaaaaa` : ``,
            color: currentTextNodeId === null ? `#aaaaaa` : ``,
          }}
          onClick={() => {
            dispatch({ type: "SWITCH_BOLD" });
          }}
          disabled={currentTextNodeId === null}
        >
          <FaBold />
        </button>
        <button
          className={currentTextNodeId === null ? `` : `hover:bg-[#aaaaaa]`}
          style={{
            padding: "0.4rem",
            backgroundColor: toolBarState.italic ? `#aaaaaa` : ``,
            color: currentTextNodeId === null ? `#aaaaaa` : ``,
          }}
          onClick={() => {
            dispatch({ type: "SWITCH_ITALIC" });
          }}
          disabled={currentTextNodeId === null}
        >
          <FiItalic />
        </button>
        <button
          className={currentTextNodeId === null ? `` : `hover:bg-[#aaaaaa]`}
          style={{
            padding: "0.4rem",
            backgroundColor: toolBarState.underline ? `#aaaaaa` : ``,
            color: currentTextNodeId === null ? `#aaaaaa` : ``,
          }}
          onClick={() => {
            dispatch({ type: "SWITCH_UNDERLINE" });
          }}
          disabled={currentTextNodeId === null}
        >
          <FiUnderline />
        </button>
        <button
          className={currentTextNodeId === null ? `` : `hover:bg-[#aaaaaa]`}
          style={{
            padding: "0.4rem",
            color: currentTextNodeId === null ? `#aaaaaa` : ``,
          }}
          onClick={() => {
            dispatch({ type: "DELETE_NODE" });
          }}
          disabled={currentTextNodeId === null}
        >
          <AiFillDelete />
        </button>
        <div className="z-[100] h-full flex justify-center items-center" id="bg-color-changer">
          <Popover>
            <PopoverTrigger >
              <button 
                disabled={currentTextNodeId === null}
                className="aspect-square h-[65%] rounded-sm border-[2px] border-black box-border"
                style={{backgroundColor: rgbaToHex(fontColor)}}
              />
            </PopoverTrigger>
            <PopoverContent className="max-w-min">
              <PopoverArrow />
              <SketchPicker
                className="min-w-[250px]"
                disableAlpha={false}
                color={fontColor}
                onChange= {handleChangeFontColor}
                onChangeComplete= {handleChangeFontColorComplete}
              />
            </PopoverContent>

          </Popover>
        </div>
        <div className="z-[100] h-full flex justify-center items-center" id="bg-color-changer">
          <Popover>
            <PopoverTrigger >
              <button 
                disabled={currentTextNodeId === null}
                className="aspect-square h-[65%] rounded-sm border-[2px] border-black box-border"
                style={{backgroundColor: rgbaToHex(bgColor)}}
              />
            </PopoverTrigger>
            <PopoverContent className="max-w-min">
              <PopoverArrow />
              <SketchPicker
                className="min-w-[250px]"
                disableAlpha={false}
                color={bgColor}
                onChange= {handleChangeBgColor}
                onChangeComplete= {handleChangeBgColorComplete}
              />
            </PopoverContent>

          </Popover>
        </div>
      </div>
      <div id="textTool-section" className={commonStyle}>
        <button
          style={{
            padding: "0.4rem",
            backgroundColor: toolBarState.textTool ? `#aaaaaa` : ``,
          }}
          onClick={() => {
            dispatch({ type: "SWITCH_TEXT_TOOL" });
          }}
        >
          <IoText />
        </button>
      </div>
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
