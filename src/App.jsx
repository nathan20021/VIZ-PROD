import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";

const initialNodes = [
  {
    id: "node-1",
    type: "serviceComponent",
    position: { x: 64, y: 0 },

    data: { url: "aws-asset/VR-AR/Amazon-Sumerian.png" },
  },
  {
    id: "node-2",
    type: "serviceComponent",
    position: { x: 0, y: 0 },
    data: { url: "aws-asset/Compute/Amazon-EC2.png" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    type: "straight",
    source: "node-1",
    target: "node-2",
    animated: true,
    label: "yes",
  },
];

const App = () => {
  const [dragging, setDragging] = useState(false);
  const [currentURL, setCurrentURL] = useState("None");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    console.log(nodes);
  }, [nodes.length]);

  return (
    <main
      className="flex overflow-hidden"
      onDragStart={(e) => {
        setDragging(true);
        if (e.target.src !== undefined) {
          let data = e.target.src.toString().split("aws-asset");
          setCurrentURL(`aws-asset${data[data.length - 1]}`);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        console.log("HAHAHAHA");
        if (currentURL !== "None") {
          setCurrentURL("None");
          setDragging(false);
          setNodes(
            nodes.concat([
              {
                id: `node-${nodes.length + 1}`,
                type: "serviceComponent",
                position: { x: -32, y: -32 },
                data: { url: currentURL },
              },
            ])
          );
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div id="Side Bar" className="w-[25%] h-screen overflow-y-scroll z-50">
        <SideBar />
      </div>
      <div
        id="EditorContainer"
        className="w-[75%] h-screen z-0 relative bg-white"
      >
        <Editor
          setEdges={setEdges}
          setNodes={setNodes}
          nodes={nodes}
          edges={edges}
        />
      </div>
    </main>
  );
};

export default App;
