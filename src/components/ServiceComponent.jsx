import { Handle, Position } from "react-flow-renderer";

function ServiceComponent({ data }) {
  return (
    <div className="w-[32px] h-[32px]">
      <div>
        <img src={data.url} alt="adf" />
      </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}

export default ServiceComponent;
