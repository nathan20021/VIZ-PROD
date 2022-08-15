import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import SideBar from "./components/SideBar";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
} from "react-flow-renderer";

import ServiceComponent from "./components/ServiceComponent";

const removeDashes = (str) => {
  const replaceAt = function (index, replacement, string) {
    return (
      string.substring(0, index) +
      replacement +
      string.substring(index + replacement.length)
    );
  };
  let result = str;
  for (var i = 0; i < result.length; i++) {
    result.charAt(i) === "-" ? (result = replaceAt(i, " ", result)) : void 0;
    result.charAt(i) === "_" ? (result = replaceAt(i, " ", result)) : void 0;
  }
  return result;
};

const toImageNameFromURL = (url) => {
  let data = url;
  if (url !== "None") {
    data = removeDashes(
      data
        .split("aws-asset")[1]
        .split("/")[2]
        .replace(/\.[^/.]+$/, "")
    );
  }
  return data;
};

const initialNodes = [
  {
    id: "node-1",
    type: "serviceComponent",
    position: { x: 0, y: 0 },

    data: { url: "aws-asset/VR-AR/Amazon-Sumerian.png" },
  },
];
const initialEdges = [
  // {
  //   id: "e1-2",
  //   source: "node-1",
  //   target: "node-2",
  //   type: "smoothstep",
  //   label: "haha",
  // },
];

const App = () => {
  const reactFlowWrapper = useRef(null);
  const sideBox = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [currentURL, setCurrentURL] = useState("None");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [hoverImageURL, setHoverImageURL] = useState("None");
  const [hoverAreaActivate, setHoverAreaActivate] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodeTypes = useMemo(() => ({ serviceComponent: ServiceComponent }), []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDrop = useCallback((e) => {
    e.preventDefault();
    if (currentURL !== "None") {
      setCurrentURL("None");
      setDragging(false);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });
      console.log(position);
      setNodes(
        nodes.concat([
          {
            id: `node-${nodes.length + 1}`,
            type: "serviceComponent",
            position: position,
            data: { url: currentURL },
          },
        ])
      );
    }
  });

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
      onDrop={() => {
        setDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
    >
      <div
        id="Side Bar"
        className="w-[25%] h-screen overflow-y-scroll z-40 shadow-2xl"
        onMouseOver={(e) => {
          if (e.target.src !== undefined) {
            let url = e.target.src.toString();
            setHoverImageURL(url);
          }
        }}
        onMouseLeave={(e) => {
          setHoverImageURL("None");
        }}
      >
        <SideBar />
      </div>
      <div
        id="EditorContainer"
        className="w-[75%] h-screen relative bg-white z-50"
      >
        <div
          ref={sideBox}
          className={
            !(hoverImageURL === "None" || dragging)
              ? `
              absolute bg-white w-[8rem] 
              h-[11rem] z-40 border-[#333333] border-2 
              flex flex-col justify-center items-center
              ml-4 mt-4 gap-3 px-1 shadow-lg duration-200 ease-in
              `
              : `
                opacity-0 absolute bg-white w-[8rem] 
                h-[11rem] border-[#333333] border-2 
                flex flex-col justify-center items-center
                ml-4 mt-4 gap-3 px-1 shadow-lg -z-50
                `
          }
        >
          <div className="w-full h-[40%] flex flex-col justify-end items-center">
            <img
              src={hoverImageURL}
              alt={toImageNameFromURL(hoverImageURL)}
              className="w-[3rem] h-[3rem] duration-200 ease-in "
            />
          </div>
          <div className="w-[90%] h-[60%] text-center flex flex-col justify-start items-center">
            <p className="w-full text-center text-xs font-bold text-[#333232]">
              {toImageNameFromURL(hoverImageURL)}
            </p>
          </div>
        </div>
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper w-full h-full"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              fitView
            >
              <Background color="#aaa" size={0.7} gap={15} />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </main>
  );
};

export default App;
