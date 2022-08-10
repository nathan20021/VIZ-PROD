import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import * as React from "react";
import "beautiful-react-diagrams/styles.css";
import SideBar from "./components/SideBar";
import ServiceNode from "./components/ServiceNode";
const initialSchema = createSchema({
  nodes: [
    {
      id: "node-1",
      content: "Node 1",
      coordinates: [150, 60],
      outputs: [{ id: "port-1", alignment: "right" }],
    },
    {
      id: "ec2-node",
      coordinates: [250, 60],
      render: ServiceNode,
      inputs: [{ id: "custom-port-1", alignment: "left" }],
      data: {
        nodeType: "ec2",
      },
    },
    {
      id: "ecs-node",
      coordinates: [300, 60],
      render: ServiceNode,
      inputs: [{ id: "custom-port-2", alignment: "left" }],
      data: {
        nodeType: "ecs",
      },
    },
  ],
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div className="h-full">
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

const App = () => {
  return (
    <main className="flex">
      <div id="Side Bar" className="w-[20%] h-screen overflow-y-scroll">
        <SideBar />
      </div>
      <div className="w-[80%] h-screen">
        <UncontrolledDiagram />
      </div>
    </main>
  );
};

export default App;
