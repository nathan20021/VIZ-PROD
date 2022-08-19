import React, { useState } from "react";
import { IoText, IoSave } from "react-icons/io5";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import switchTextTool from "../actions/switchTextTool";

const SideControlPanel = () => {
  const dispatch = useDispatch();
  const textTool = useSelector((state) => state.toolBarState.textTool);
  const [headerTool, setHeaderTool] = useState(false);
  return (
    <div>
      <button
        className={
          headerTool
            ? `text-sm p-2 bg-[#333333] text-white rounded-full shadow-xl border-[#aaaaaa] border-2`
            : `text-sm p-2 bg-white rounded-full shadow-xl border-[#aaaaaa] border-2`
        }
        onClick={() => {
          console.log(nodes);
          console.log(edges);
        }}
      >
        <p>N</p>
      </button>
      <button
        className={
          headerTool
            ? `text-sm p-2 bg-[#333333] text-white rounded-full shadow-xl border-[#aaaaaa] border-2`
            : `text-sm p-2 bg-white rounded-full shadow-xl border-[#aaaaaa] border-2`
        }
        onClick={() => {
          dispatch(switchTextTool());
        }}
      >
        <p></p>
      </button>
      <button
        className={
          textTool
            ? `text-base p-2 bg-[#333333] text-white rounded-full shadow-xl border-[#aaaaaa] border-2`
            : `text-base p-2 bg-white rounded-full shadow-xl border-[#aaaaaa] border-2`
        }
        onClick={() =>
          dispatch({
            type: "SWITCH_TEXT_TOOL",
          })
        }
      >
        <IoText />
      </button>
      <button
        className={`text-base p-2 bg-white rounded-full shadow-xl border-[#aaaaaa] border-2`}
        onClick={() => {
          var node = document.getElementById("hahaha");
          //   reactFlowInstance.fitView();
          domtoimage
            .toPng(node)
            .then(function (dataUrl) {
              var img = new Image();
              img.src = dataUrl;
              console.log(dataUrl);
              saveAs(dataUrl, "diagram.jpeg");
            })
            .catch(function (error) {
              console.error("oops, something went wrong!", error);
            });
        }}
      >
        <IoSave />
      </button>
    </div>
  );
};

export default SideControlPanel;
