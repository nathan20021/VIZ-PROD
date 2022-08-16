import { Handle, Position } from "react-flow-renderer";
function ServiceComponent({ data }) {
  return (
    <div>
      <div className="w-[30px] h-[30px]">
        <img src={data.url} alt={data.url} />
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

export default ServiceComponent;
