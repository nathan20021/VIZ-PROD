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

const initialEdges = [
  {
    source: "node-5",
    sourceHandle: "sr",
    target: "node-6",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    id: "reactflow__edge-node-5sr-node-6sl",
    interactionWidth: 20,
  },
  {
    source: "node-4",
    sourceHandle: "sr",
    target: "node-6",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-4sr-node-6sl",
  },
  {
    source: "node-6",
    sourceHandle: "sr",
    target: "node-7",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-6sr-node-7sl",
  },
  {
    source: "node-6",
    sourceHandle: "sr",
    target: "node-8",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-6sr-node-8sl",
  },
  {
    source: "node-6",
    sourceHandle: "sr",
    target: "node-9",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-6sr-node-9sl",
  },
  {
    source: "node-8",
    sourceHandle: "sr",
    target: "node-11",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-8sr-node-11sl",
  },
  {
    source: "node-8",
    sourceHandle: "sr",
    target: "node-10",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-8sr-node-10sl",
  },
  {
    source: "node-7",
    sourceHandle: "sl",
    target: "node-6",
    targetHandle: "sr",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-7sl-node-6sr",
  },
  {
    source: "node-11",
    sourceHandle: "sr",
    target: "node-18",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-11sr-node-18sl",
  },
  {
    source: "node-10",
    sourceHandle: "sr",
    target: "node-18",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-10sr-node-18sl",
    selected: false,
  },
  {
    source: "node-9",
    sourceHandle: "sr",
    target: "node-18",
    targetHandle: "sl",
    style: {
      stroke: "#000000",
      cursor: "pointer",
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#000000",
      strokeWidth: "2px",
    },
    interactionWidth: 20,
    id: "reactflow__edge-node-9sr-node-18sl",
  },
];
const initialNodes = [
  {
    id: "node-0",
    type: "boundaryNode",
    draggable: false,
    position: {
      x: 210,
      y: 179.5,
    },
    zIndex: -1,
    data: {
      nodeId: "node-0",
      color: "#333333",
      bgColor: "#eeeeee38",
      url: "aws-logo.jpeg",
      dashed: false,
      width: "400px",
      height: "300px",
      cornerIcon: true,
      bodySelectable: false,
    },
    width: 385,
    height: 255,
    selected: false,
    positionAbsolute: {
      x: 210,
      y: 179.5,
    },
    dragging: false,
  },
  {
    id: "node-1",
    type: "headerNode",
    position: {
      x: 48.61066942324078,
      y: 104.86184452423977,
    },
    width: 275,
    height: 35,
    selected: false,
    positionAbsolute: {
      x: 48.61066942324078,
      y: 104.86184452423977,
    },
    dragging: false,
  },
  {
    id: "node-2",
    type: "boundaryNode",
    position: {
      x: -14.990545188792225,
      y: 234.41724454641815,
    },
    zIndex: -1,
    data: {
      color: "#001797",
      bgColor: "none",
      url: "none",
      dashed: true,
      width: "200px",
      height: "200px",
      cornerIcon: false,
      bodySelectable: false,
      nodeId: "node-2",
    },
    width: 205,
    height: 154,
    draggable: false,
    selected: false,
    positionAbsolute: {
      x: -14.990545188792225,
      y: 234.41724454641815,
    },
    dragging: false,
  },
  {
    id: "node-3",
    type: "serviceComponent",
    position: {
      x: 39.86592722320245,
      y: 318.6952172620662,
    },
    data: {
      url: "aws-asset-res/[loT]%20AWS-IoT-Thing/Generic.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 39.86592722320245,
      y: 318.6952172620662,
    },
    dragging: false,
  },
  {
    id: "node-4",
    type: "serviceComponent",
    position: {
      x: 39.86592722320245,
      y: 318.6952172620662,
    },
    data: {
      url: "aws-asset-res/[loT]%20AWS-IoT-Thing/Medical-Emergency.png",
    },
    selected: false,
    positionAbsolute: {
      x: 39.86592722320245,
      y: 318.6952172620662,
    },
    dragging: false,
    width: 30,
    height: 30,
  },
  {
    id: "node-5",
    type: "serviceComponent",
    position: {
      x: 36.85477445790053,
      y: 250.79371771119628,
    },
    data: {
      url: "aws-asset-res/[loT]%20AWS-IoT-Thing/Generic.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 36.85477445790053,
      y: 250.79371771119628,
    },
    dragging: false,
  },
  {
    id: "node-6",
    type: "serviceComponent",
    position: {
      x: 116.69863574367338,
      y: 286.1450298182074,
    },
    data: {
      url: "aws-asset-res/[Migration-and-Transfer]%20AWS-Mainframe-Modernization/Developer.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 116.69863574367338,
      y: 286.1450298182074,
    },
    dragging: false,
  },
  {
    id: "node-7",
    type: "serviceComponent",
    position: {
      x: 272.87150360585343,
      y: 207.58186210357036,
    },
    data: {
      url: "aws-asset/Security-Identity-Compliance/Amazon-Cognito.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 272.87150360585343,
      y: 207.58186210357036,
    },
    dragging: false,
  },
  {
    id: "node-8",
    type: "serviceComponent",
    position: {
      x: 274.40435444764876,
      y: 283.63204954742906,
    },
    data: {
      url: "aws-asset/App-Integration/Amazon-API-Gateway.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 274.40435444764876,
      y: 283.63204954742906,
    },
    dragging: false,
  },
  {
    id: "node-9",
    type: "serviceComponent",
    position: {
      x: 358.9842982433496,
      y: 367.6729586645732,
    },
    data: {
      url: "aws-asset/Analytics/Amazon-Kinesis-Firehose.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 358.9842982433496,
      y: 367.6729586645732,
    },
    dragging: false,
  },
  {
    id: "node-10",
    type: "serviceComponent",
    position: {
      x: 378.0475128910977,
      y: 216.89596703750104,
    },
    data: {
      url: "aws-asset/Compute/Amazon-EC2.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 378.0475128910977,
      y: 216.89596703750104,
    },
    dragging: false,
  },
  {
    id: "node-11",
    type: "serviceComponent",
    position: {
      x: 379.55308927374864,
      y: 283.6208967821272,
    },
    data: {
      url: "aws-asset/Compute/AWS-Lambda.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 379.55308927374864,
      y: 283.6208967821272,
    },
    dragging: false,
  },
  {
    id: "node-13",
    type: "textUpdater",
    position: {
      x: 264.8797274056039,
      y: 373.1340472621199,
    },
    data: {
      value: "Telemetry",
      nodeId: "node-13",
    },
    width: 65,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 264.8797274056039,
      y: 373.1340472621199,
    },
    dragging: false,
  },
  {
    id: "node-14",
    type: "textUpdater",
    position: {
      x: 326.3797274056039,
      y: 402.6340472621199,
    },
    data: {
      value: "Kinesis Firehose",
      nodeId: "node-14",
    },
    width: 108,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 326.3797274056039,
      y: 402.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-15",
    type: "textUpdater",
    position: {
      x: 13.379727405603887,
      y: 351.6340472621199,
    },
    data: {
      value: "IOT Devices",
      nodeId: "node-15",
    },
    width: 81,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 13.379727405603887,
      y: 351.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-16",
    type: "textUpdater",
    position: {
      x: 96.87972740560389,
      y: 322.1340472621199,
    },
    data: {
      value: "Studio Host",
      nodeId: "node-16",
    },
    width: 81,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 96.87972740560389,
      y: 322.1340472621199,
    },
    dragging: false,
  },
  {
    id: "node-17",
    type: "textUpdater",
    position: {
      x: 48.87972740560389,
      y: 209.6340472621199,
    },
    data: {
      value: "Studio",
      nodeId: "node-17",
    },
    width: 62,
    height: 21,
    selected: false,
    positionAbsolute: {
      x: 48.87972740560389,
      y: 209.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-18",
    type: "serviceComponent",
    position: {
      x: 530.879727405604,
      y: 284.6340472621199,
    },
    data: {
      url: "aws-asset/Storage/Amazon-Simple-Storage-Service.png",
    },
    width: 30,
    height: 30,
    selected: false,
    positionAbsolute: {
      x: 530.879727405604,
      y: 284.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-19",
    type: "textUpdater",
    position: {
      x: 528.879727405604,
      y: 319.6340472621199,
    },
    data: {
      value: "S3",
      nodeId: "node-19",
    },
    width: 31,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 528.879727405604,
      y: 319.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-20",
    type: "textUpdater",
    position: {
      x: 252.87972740560383,
      y: 315.1340472621199,
    },
    data: {
      value: "API Gateway",
      nodeId: "node-20",
    },
    width: 81,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 252.87972740560383,
      y: 315.1340472621199,
    },
    dragging: false,
  },
  {
    id: "node-21",
    type: "textUpdater",
    position: {
      x: 258.37972740560383,
      y: 241.1340472621199,
    },
    data: {
      value: "Cognito",
      nodeId: "node-21",
    },
    width: 59,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 258.37972740560383,
      y: 241.1340472621199,
    },
    dragging: false,
  },
  {
    id: "node-22",
    type: "textUpdater",
    position: {
      x: 374.8797274056039,
      y: 248.1340472621199,
    },
    data: {
      value: "EC2",
      nodeId: "node-22",
    },
    width: 37,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 374.8797274056039,
      y: 248.1340472621199,
    },
    dragging: false,
  },
  {
    id: "node-23",
    type: "textUpdater",
    position: {
      x: 369.3797274056039,
      y: 321.6340472621199,
    },
    data: {
      value: "Lambda",
      nodeId: "node-23",
    },
    width: 53,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 369.3797274056039,
      y: 321.6340472621199,
    },
    dragging: false,
  },
  {
    id: "node-24",
    type: "textUpdater",
    position: {
      x: 513.879727405604,
      y: 263.6340472621199,
    },
    data: {
      value: "Data Lake",
      nodeId: "node-24",
    },
    width: 65,
    height: 17,
    selected: false,
    positionAbsolute: {
      x: 513.879727405604,
      y: 263.6340472621199,
    },
    dragging: false,
  },
];
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
    // console.log(nodes);
    // console.log(edges);
    e.target.id.split("|")[0] === "textUpdater"
      ? dispatch({
          type: "SET_CURRENT_NODE_ID",
          payload: e.target.id.split("|")[1],
        })
      : dispatch({
          type: "SET_CURRENT_NODE_ID",
          payload: null,
        });
  });

  const onKeyDownMain = useCallback((e) => {
    dispatch({ type: "SET_CURRENT_KEY", payload: e.key });
  })
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
          onMouseOver={(e) => {
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
          }}
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
                {/* {toImageNameFromURL(hoverImageURL)} */}
                {listOfBoundaries.includes(hoverImageURL)
                  ? removeDashes(hoverImageURL)
                  : toImageNameFromURL(hoverImageURL)}
              </p>
            </div>
          </div>

          <ReactFlowProvider>
            <div
              id="hahaha"
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
                deleteKeyCode={["Shift + BackSpace"]}
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
