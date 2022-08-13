import { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
} from "react-flow-renderer";

import ServiceComponent from "./ServiceComponent";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component

function Flow({ nodes, edges, setEdges, setNodes }) {
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background color="#aaa" size={0.7} gap={16} />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
