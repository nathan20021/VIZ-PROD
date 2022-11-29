import { useRef, useEffect } from "react";
import { BiLockAlt } from "react-icons/bi";

function BoundaryComponent({ data }) {
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;
    const scalingConst = 3.5;
    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx / scalingConst;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy / scalingConst;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };
    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };
    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
    };
  }, []);

  return (
    <div>
      <div
        id={data.bodySelectable ? `BoundaryEleBody|${data.nodeId}` : ``}
        ref={ref}
        style={{
          borderColor: data.color,
          background: data.bgColor === "none" ? `` : `${data.bgColor}`,
          borderStyle: data.dashed ? `dashed` : `solid`,
          width: data.width,
          height: data.height,
          cursor: data.bodySelectable ? `grab` : `default`,
        }}
        className={`min-w-[50px] min-h-[50px] relative border-[1px] box-content`}
      >
        <div
          id={`BoundaryEleBody|${data.nodeId}`}
          style={{
            borderColor: data.color,
            backgroundImage: data.url !== "none" ? `url(${data.url})` : ``,
            backgroundSize: "contain",
          }}
          className="absolute w-5 h-5 border-[1px] -left-[1px] -top-[1px] box-border cursor-grab"
        ></div>
        <div
          id={`resizer|right|${data.nodeId}`}
          ref={refRight}
          className="absolute w-1 h-full cursor-col-resize left-[100%]"
        ></div>
        <div
          id={`resizer|bottom|${data.nodeId}`}
          ref={refBottom}
          className="absolute h-1 w-full cursor-row-resize top-[100%]"
        ></div>
      </div>
    </div>
  );
}

export default BoundaryComponent;
