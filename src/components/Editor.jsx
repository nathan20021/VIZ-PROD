import React, { useRef, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import ServiceComponent from "./ServiceComponent";
import { motion } from "framer-motion";
import PrismaZoom from "react-prismazoom";

const Editor = () => {
  const [quantumnSize] = useState(18);
  const [scale, setScale] = useState(1);
  const wrapperDiv = useRef();

  return (
    <div
      className="w-full h-full bg-red-500 overflow-hidden z-0 relative"
      onWheel={(e) => {
        console.log(scale);
        if (e.deltaY < 0) {
          if (scale <= 1.7) {
            setScale(scale + 0.1);
          }
        } else if (e.deltaY > 0) {
          if (scale >= 0.6) {
            setScale(scale - 0.1);
          }
        }
      }}
    >
      <PrismaZoom className="w-full h-full z-50">
        {/* <img src="three-grid.png" alt="asdfdsf" /> */}
        <motion.div
          ref={wrapperDiv}
          className="absolute w-[4000px] h-[3000px] overflow-hidden bg-black translate-y-[-2000px] translate-x-[-1500px]"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/three-grid.png"
            })`,
            scale: scale,
          }}
        >
          <div className="w-full h-full bg-repeat overflow-hidden z-30">
            <Rnd
              default={{ x: 35 * quantumnSize, y: 35 * quantumnSize }}
              dragGrid={[quantumnSize, quantumnSize]}
              bounds="parent"
              scale={scale}
            >
              <ServiceComponent quantumnSize={quantumnSize} />
            </Rnd>
          </div>
        </motion.div>
      </PrismaZoom>
    </div>
  );
};
export default Editor;
