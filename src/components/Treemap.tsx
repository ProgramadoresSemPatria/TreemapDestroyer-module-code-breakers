import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  NodeTypes,
  OnNodesChange,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialNodes } from "../constants/initialNodes";
import { defaultEdgeOptions, initialEdges } from "../constants/initialEdges";
import { ProgressNode } from "./ProgressNode";
import { useCallback, useState } from "react";

const nodeTypes: NodeTypes = {
  progressNode: ProgressNode,
};

export function Treemap() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [setNodes]
  );

  return (
    <div className="absolute w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
