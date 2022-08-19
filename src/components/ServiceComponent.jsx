import { Handle, Position } from "react-flow-renderer";
import { useState } from "react";
function ServiceComponent({ data }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="w-[30px] h-[30px]">
        <img src={data.url} alt={data.url} />
        <Handle
          type="source"
          id="sr"
          position={Position.Right}
          onConnect={(params) => console.log("handle onConnect", params)}
          style={{
            background: "#333333",
            width: "0.2rem",
            height: "0.2rem",
            visibility: hover ? "" : "hidden",
          }}
        />
        <Handle
          type="source"
          id="sb"
          position={Position.Bottom}
          onConnect={(params) => console.log("handle onConnect", params)}
          style={{
            background: "#333333",
            width: "0.2rem",
            height: "0.2rem",
            visibility: hover ? "" : "hidden",
          }}
        />
        <Handle
          type="target"
          id="tt"
          position={Position.Top}
          onConnect={(params) => console.log("handle onConnect", params)}
          style={{
            background: "#333333",
            width: "0.2rem",
            height: "0.2rem",
            visibility: hover ? "" : "hidden",
          }}
        />
        <Handle
          type="target"
          id="tl"
          position={Position.Left}
          onConnect={(params) => console.log("handle onConnect", params)}
          style={{
            background: "#333333",
            width: "0.2rem",
            height: "0.2rem",
            visibility: hover ? "" : "hidden",
          }}
        />
      </div>
    </div>
  );
}

export default ServiceComponent;
