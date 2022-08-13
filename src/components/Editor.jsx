import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "reaflow";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFullscreenExit } from "react-icons/bs";

const Editor = () => {
  const nodes = [
    {
      id: "1",
      text: "1",
    },
    {
      id: "2",
      text: "2",
    },
  ];
  const edges = [
    {
      id: "1-2",
      from: "1",
      to: "2",
    },
  ];
  const [zoom, setZoom] = useState(0.7);
  const ref = useRef(null);

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0"
      style={{
        backgroundImage: `url("one.png")`,
      }}
    >
      <div
        id="Canvas Controller"
        className="flex flex-col gap-4 absolute ml-5 mt-5"
      >
        <button
          className="bg-white p-3 rounded-3xl"
          onClick={() => {
            ref.current.zoomIn();
          }}
        >
          <AiOutlinePlus />
        </button>
        <button
          className="bg-white p-3 rounded-3xl"
          onClick={() => {
            ref.current.zoomOut();
          }}
        >
          <AiOutlineMinus />
        </button>
        <button
          className="bg-white p-3 rounded-3xl"
          onClick={() => {
            ref.current.fitCanvas();
          }}
        >
          <BsFullscreenExit />
        </button>
      </div>
      <Canvas
        maxZoom={0.9}
        minZoom={-0.4}
        zoom={zoom}
        ref={ref}
        nodes={nodes}
        edges={edges}
        onZoomChange={(z) => {
          setZoom(z);
        }}
        onLayoutChange={(layout) => {
          console.log("Layout Changed:", layout);
        }}
      />
    </div>
  );
};
export default Editor;
