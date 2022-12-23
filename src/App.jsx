import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
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
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSelector, useDispatch } from "react-redux";

import defaultFlow from "./utils/initials.json"

import ServiceComponent from "./components/ServiceComponent";
import BoundaryComponent from "./components/AwsBoundaryComponent";
import TextUpdaterNode from "./components/TextUpdaterNode";
import HeaderNode from "./components/HeaderNode";
import boundaryJson from "./utils/boundary-icon.json";
import ControlPanel from "./components/ControlPanel";
import TopBar from "./components/TopBar";
import useHotkeys from "@reecelucas/react-use-hotkeys";

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

const initialEdges = defaultFlow.defaultEdges

const initialNodes = defaultFlow.defaultNodes

const App = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const sideBox = useRef(null);
  const sideBarState = useSelector((state) => state.sideBarState);
  const textTool = useSelector((state) => state.toolBarState.textTool);
  const headerTitle = useSelector((state) => state.headerTitle);
  const currentTextNodeId = useSelector((state) => state.currentTextNodeId);
  const deleteRequest = useSelector((state) => state.deleteNodeRequest);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(true);
  const [currentURL, setCurrentURL] = useState("None");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hoverImageURL, setHoverImageURL] = useState(
    "aws-asset/Compute/Amazon-EC2.png"
  );
  const [headerTool, setHeaderTool] = useState(false);
  const [hoverAreaActivate, setHoverAreaActivate] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currentBoundaryData, setCurrentBoundaryData] = useState({});
  const deleteNodeById = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };
  const nodeTypes = useMemo(
    () => ({
      serviceComponent: ServiceComponent,
      boundaryNode: BoundaryComponent,
      textUpdater: TextUpdaterNode,
      headerNode: HeaderNode,
    }),
    []
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            style: { stroke: "#000000", cursor: "pointer" },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#000000",
              strokeWidth: "2px",
            },
            interactionWidth: 3,
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
      const textNodePosition = reactFlowInstance.project({
        x: e.clientX - reactFlowBounds.left - 30,
        y: e.clientY - reactFlowBounds.top + 70,
      });
      setNodes(
        nodes.concat([
          {
            id: `node-${nodes.length + 1}`,
            type: "serviceComponent",
            position: position,
            data: { url: currentURL },
          },
          {
            id: `node-${nodes.length + 2}`,
            type: "textUpdater",
            position: textNodePosition,
            data: {
              value: toImageNameFromURL(currentURL),
              nodeId: `node-${nodes.length + 2}`,
            },
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

  const onClickMain = useCallback((e) => {
    e.target.id === "text-updater"? void 0 : dispatch({ type: "SET_CURRENT_NODE_ID", payload: null });
  });

  const onKeyDownMain = useCallback((e) => {
    // dispatch({ type: "SET_CURRENT_KEY", payload: e.key });
  })
  const onKeyUpMain = useCallback((e) => {
    // dispatch({ type: "SET_CURRENT_KEY", payload: undefined });
  })

  const onMouseOverSidebar = (e) => {
    if (e.target.id !== "SearchBar") {
      if (e.target.src !== undefined) {
        let url = e.target.src.toString();
        setHoverImageURL(url);
        setHoverAreaActivate(true);
      } else if (e.target.id.split("|")[1] === "boundaryGrab") {
        setHoverImageURL(e.target.id.split("|")[0]);
        setHoverAreaActivate(true);
      }
    } else {
      setHoverAreaActivate(false);
    }
  }
  
  useEffect(() => {
    window.onbeforeunload = function (e) {
      return "Do you want to exit this page?";
    };
  }, []);

  useEffect(() => {
    deleteRequest && currentTextNodeId !== null
      ? deleteNodeById(currentTextNodeId)
      : void 0;
    dispatch({ type: "SET_DELETE_REQUEST", payload: false });
    dispatch({ type: "SET_CURRENT_NODE_ID", payload: null });
  }, [deleteRequest]);

  useEffect(() => {
    document.title = `${headerTitle}`;
  }, [headerTitle]);

  useHotkeys(["control+z", "meta+z"], (e) => {
    e.preventDefault();
    console.log("UNDOOOO");
  });

  useHotkeys(["control+shift+z", "meta+shift+z"], (e) => {
    e.preventDefault();
    console.log("REDOOOO");
  });

  useHotkeys(["control+s", "meta+s"], (e) => {
    e.preventDefault();
    console.log("Saving this shit");
  });

  return (
    <main className="overflow-hidden h-screen">

        <div className="h-[10%] w-full">
          <div className="h-2/3  w-full">
            <TopBar />
          </div>
          <div className="h-1/3  w-full">
            <ControlPanel />
          </div>
        </div>
        <div
          id="sidebar-reactflow-container"
          className="flex overflow-hidden h-[90%]"
          onDragStart={onDragStart}
          onDrop={onDropMain}
          onDragOver={onDragOverMain}
        >

          <div
            id="Side Bar"
            className={
              sideBarState
                ? `w-[24%] h-full overflow-y-scroll z-[99] select-none shadow-md shadow-[#979797]`
                : `hidden`
            }
            onMouseOver={onMouseOverSidebar}
            onMouseLeave={() => {
              setHoverAreaActivate(false);
            }}
          >
            <SideBar />
          </div>

          <div
            id="EditorContainer"
            style={{
              cursor: textTool ? `text` : `default`,
            }}
            className={
              sideBarState
                ? `w-[85%] h-full relative bg-white z-50`
                : `w-[100%] h-full relative bg-white z-50`
            }
            onMouseUp={(e) => {
              if (Object.keys(currentBoundaryData).length !== 0) {
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
                      zIndex: -1,
                      data: {
                        ...currentBoundaryData,
                        nodeId: `node-${nodes.length + 1}`,
                      },
                    },
                  ])
                );
                setCurrentBoundaryData({});
              }
            }}
            onClick={(e) => {
              if (textTool) {
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
                      type: "textUpdater",
                      position: position,
                      data: {
                        value: "TEXT",
                        nodeId: `node-${nodes.length + 1}`,
                      },
                    },
                  ])
                );
                dispatch({ type: "SWITCH_TEXT_TOOL" });
              }
              if (headerTool) {
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
                      type: "headerNode",
                      position: position,
                    },
                  ])
                );
                setHeaderTool(false);
              }
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
                  {listOfBoundaries.includes(hoverImageURL)
                    ? removeDashes(hoverImageURL)
                    : toImageNameFromURL(hoverImageURL)}
                </p>
              </div>
            </div>
            <ReactFlowProvider>

              <div
                id="react-flow-provider"
                className="reactflow-wrapper w-full h-full bg-white"
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
                  onClick={onClickMain}
                  onKeyDown={onKeyDownMain}
                  onKeyUp={onKeyUpMain}
                  disableKeyboardA11y={true}
                  onMouseOver={(e)=>{
                    e.target.id.split("|")[0] === "resizer" ? setResizing(false) : void 0
                    }
                  }
                  onMouseUp={(e)=>{
                      e.target.id.split("|")[0] === "resizer" && resizing? void 0 : setResizing(true)
                  }}
                  onInit={setReactFlowInstance}
                  panOnDrag={resizing}
                  onDrop={onDrop}
                  connectionMode="loose"
                  fitView
                >
                  <Background color="#aaa" size={0.7} gap={15} />
                  <Controls />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </div>
        </div>
    </main>
  );
};

export default App;
