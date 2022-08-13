import React, { useRef, useCallback, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import ServiceComponent from "./ServiceComponent";

const Editor = () => {
  const [quantumnSize] = useState(18);
  return (
    <div className="w-full h-full bg-red-500">
      <Rnd
        default={{ x: 0, y: 0, width: "100%", height: "100%" }}
        bounds="parent"
        // enableResizing={false}
        // disableDragging={false}
      >
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/grid-bg.webp"})`,
          }}
        >
          <Rnd
            default={{ x: 0.5 * quantumnSize, y: 0.5 * quantumnSize }}
            dragGrid={[quantumnSize, quantumnSize]}
            bounds="parent"
          >
            <ServiceComponent quantumnSize={quantumnSize} />
          </Rnd>
        </div>
      </Rnd>
    </div>
  );
};
export default Editor;
