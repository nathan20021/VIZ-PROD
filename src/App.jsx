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
  MarkerType,
} from "react-flow-renderer";

import ServiceComponent from "./components/ServiceComponent";
import BoundaryComponent from "./components/AwsBoundaryComponent";
import boundaryJson from "./utils/boundary-icon.json";

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
const listOfBoundaries = Object.keys(boundaryJson);

const initialNodes = [
  {
    id: "node-1",
    type: "serviceComponent",
    position: { x: 0, y: 0 },

    data: { url: "aws-asset/VR-AR/Amazon-Sumerian.png" },
  },
  {
    id: "node-3",
    type: "boundaryNode",
    draggable: false,
    position: { x: 200, y: 200 },
    zIndex: 0,
    data: {
      nodeId: "node-3",
      color: "#333333",
      bgColor: "#eeeeee38",
      url: "aws-logo.jpeg",
      dashed: false,
      width: "200px",
      height: "200px",
      cornerIcon: true,
      bodySelectable: false,
    },
  },
  {
    id: "node-4",
    type: "boundaryNode",
    draggable: false,
    zIndex: -1,
    position: { x: 400, y: 200 },
    data: {
      nodeId: "node-4",
      color: "#001797",
      bgColor: "none",
      url: "aws-asset/Networking-Content-Delivery/Amazon-Virtual-Private-Cloud.png",
      dashed: true,
      width: "200px",
      height: "200px",
      cornerIcon: false,
      bodySelectable: true,
    },
  },
  {
    id: "node-2",
    type: "serviceComponent",
    position: { x: 100, y: 100 },
    data: { url: "aws-asset/Compute/Amazon-EC2.png" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "node-1",
    target: "node-2",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const App = () => {
  const reactFlowWrapper = useRef(null);
  const sideBox = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [currentURL, setCurrentURL] = useState("None");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [hoverImageURL, setHoverImageURL] = useState(
    "aws-asset/Compute/Amazon-EC2.png"
  );
  const [hoverAreaActivate, setHoverAreaActivate] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currentBoundaryData, setCurrentBoundaryData] = useState({});
  const nodeTypes = useMemo(
    () => ({
      serviceComponent: ServiceComponent,
      boundaryNode: BoundaryComponent,
    }),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
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

  const onDragStart = useCallback((e) => {
    setDragging(true);
    if (e.target.src !== undefined) {
      let data = e.target.src.toString().split("aws-asset");
      setCurrentURL(`aws-asset${data[data.length - 1]}`);
    }
  });

  const onDropMain = useCallback((e) => {
    setDragging(false);
    setHoverAreaActivate(false);
  });

  const onDragOverMain = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  });

  return (
    <main
      className="flex overflow-hidden"
      onDragStart={onDragStart}
      onDrop={onDropMain}
      onDragOver={onDragOverMain}
    >
      <div
        id="Side Bar"
        className="w-[25%] h-screen overflow-y-scroll z-50 shadow-2xl shadow-black"
        onMouseDown={(e) => {
          if (e.target.id.split("|").length === 2) {
            const key = e.target.id.split("|")[0];
            setCurrentBoundaryData(boundaryJson[key]);
          }
        }}
        onMouseOver={(e) => {
          if (e.target.src !== undefined) {
            let url = e.target.src.toString();
            setHoverImageURL(url);
            setHoverAreaActivate(true);
          } else if (e.target.id.split("|")[1] == "boundaryGrab") {
            setHoverImageURL(e.target.id.split("|")[0]);
            setHoverAreaActivate(true);
          }
        }}
        onMouseLeave={() => {
          setHoverAreaActivate(false);
        }}
      >
        <SideBar />
      </div>
      <div
        id="EditorContainer"
        className="w-[75%] h-screen relative bg-white z-50"
        onMouseUp={(e) => {
          const reactFlowBounds =
            reactFlowWrapper.current.getBoundingClientRect();

          const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left - 20,
            y: e.clientY - reactFlowBounds.top - 20,
          });
          setNodes(
            nodes.concat([
              {
                id: `node-${nodes.length + 1}`,
                type: "boundaryNode",
                position: position,
                data: {
                  ...currentBoundaryData,
                  nodeId: `node-${nodes.length + 1}`,
                },
              },
            ])
          );
          console.log(currentBoundaryData);
          setCurrentBoundaryData({});
        }}
      >
        {/* Hovering Box */}
        <div
          ref={sideBox}
          className={
            !(!hoverAreaActivate || dragging)
              ? `
              absolute bg-white w-[8rem] 
              h-[9rem] z-40 border-[#333333] border-2 
              flex flex-col justify-center items-center
              ml-4 mt-4 gap-3 px-1 shadow-lg duration-200 ease-in
              `
              : `
                opacity-0 absolute bg-white w-[8rem] 
                h-[9rem] border-[#333333] border-2 
                flex flex-col justify-center items-center
                ml-4 mt-4 gap-3 px-1 shadow-lg -z-50 duration-200 ease-in
                `
          }
        >
          <div className="w-full h-[50%] flex flex-col justify-end items-center">
            {listOfBoundaries.includes(hoverImageURL) ? (
              <div key={hoverImageURL}>
                <div
                  style={{
                    borderColor: boundaryJson[hoverImageURL].color,
                    background:
                      boundaryJson[hoverImageURL].bgColor === "none"
                        ? ``
                        : `${boundaryJson[hoverImageURL].bgColor}`,
                    borderStyle: boundaryJson[hoverImageURL].dashed
                      ? `dashed`
                      : `solid`,
                  }}
                  className={`w-12 h-12 relative border-[1px] box-content cursor-pointer`}
                >
                  <div
                    style={{
                      borderColor: boundaryJson[hoverImageURL].color,
                      backgroundImage:
                        boundaryJson[hoverImageURL].url !== "none"
                          ? `url(${boundaryJson[hoverImageURL].url})`
                          : ``,
                      backgroundSize: "contain",
                    }}
                    className="absolute w-5 h-5 border-[1px] -left-[1px] -top-[1px] box-borders"
                  ></div>
                </div>
              </div>
            ) : (
              <img
                src={hoverImageURL}
                alt={toImageNameFromURL(hoverImageURL)}
                className="w-[3rem] h-[3rem] duration-200 ease-in "
              />
            )}
          </div>
          <div className="w-[90%] h-[50%] text-center flex flex-col justify-start items-center">
            <p className="w-full text-center text-xs font-bold text-[#333232]">
              {/* {toImageNameFromURL(hoverImageURL)} */}
              {listOfBoundaries.includes(hoverImageURL)
                ? removeDashes(hoverImageURL)
                : toImageNameFromURL(hoverImageURL)}
            </p>
          </div>
        </div>
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper w-full h-full"
            ref={reactFlowWrapper}
            onMouseOver={(e) => {
              if (e.target.id.split("|").length === 2) {
                const [type, nodeID] = e.target.id.split("|");
                if (type === "BoundaryEleBody") {
                  setNodes(() =>
                    nodes.map((obj) => {
                      if (obj.id === nodeID) {
                        return { ...obj, draggable: true };
                      }
                      return obj;
                    })
                  );
                }
              } else {
                setNodes(() =>
                  nodes.map((obj) => {
                    if (obj.type === "boundaryNode") {
                      return { ...obj, draggable: false };
                    }
                    return obj;
                  })
                );
              }
            }}
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
