import { Handle, Position, useStore } from "reactflow";
import { useState } from "react";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

function ServiceComponent({ data }) {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="w-[30px] h-[30px]">
        <img src={data.url} alt={data.url} />
        <Handle
          id="sr"
          type="source"
          position={Position.Right}
          style={{
            background: "#333333",
            visibility: hover ? "" : "hidden",
          }}
        />
        <Handle
          id="sb"
          type="source"
          position={Position.Bottom}
          style={{
            background: "#ff000",
            visibility: hover ? "" : "hidden",
          }}
        />

        <Handle
          id="st"
          type="source"
          onMouseDown={() => {
            dispatch({ type: "SET_DRAG_HANDLE", payload: "tt" });
          }}
          position={Position.Top}
          style={{
            background: "#333333",
            visibility: hover ? "" : "hidden",
          }}
        />
        <Handle
          id="sl"
          type="source"
          onMouseDown={() => {
            dispatch({ type: "SET_DRAG_HANDLE", payload: "tl" });
          }}
          position={Position.Left}
          style={{
            background: "#333333",
            visibility: hover ? "" : "hidden",
          }}
        />
      </div>
    </div>
  );
}

export default ServiceComponent;
