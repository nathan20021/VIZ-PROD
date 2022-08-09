import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import * as React from "react";
import "beautiful-react-diagrams/styles.css";

const CustomNode = ({inputs, data}) => {

  return (
    <div className="rounded-md w-10 h-10 z-10">
      <div className=" h-auto w-full select-none pointer-events-none -z-20">
        <img
          src={`${data.nodeType}.jpeg`}
          alt={data.nodeType}
          className="select-none pointer-events-none"
        ></img>
      </div>
      <div className="mt-1">
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "50px", height: "25px", background: "#1B263B" },
          })
        )}
      </div>
    </div>
  );
};

const initialSchema = createSchema({
  nodes: [
    {
      id: "node-1",
      content: "Node 1",
      coordinates: [150, 60],
      outputs: [{ id: "port-1", alignment: "right" }],
    },
    {
      id: "node-custom",
      coordinates: [250, 60],
      render: CustomNode,
      inputs: [{ id: "custom-port-1", alignment: "left" }],
      data : {
        nodeType : 'ec2'
      }
    },
  ],
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div style={{ height: "22.5rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <UncontrolledDiagram />
    </div>
  );
};

export default App;
