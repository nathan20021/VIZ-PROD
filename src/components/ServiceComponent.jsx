import { Handle, Position } from "react-flow-renderer";

function ServiceComponent({ data }) {
  return (
    <div className="w-[30px] h-[30px]">
      <div>
        <img src={data.url} alt={data.url} />
      </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}

export default ServiceComponent;
