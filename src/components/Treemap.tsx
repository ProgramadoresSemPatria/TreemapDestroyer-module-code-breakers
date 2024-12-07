import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Edge,
  Node,
  NodeTypes,
  OnNodesChange,
  Panel,
  ReactFlow,
} from "@xyflow/react";

import { initialNodes } from "../constants/initialNodes";
import { defaultEdgeOptions, initialEdges } from "../constants/initialEdges";
import { ProgressNode } from "./ProgressNode";
import { useCallback, useState } from "react";
import { Buttons } from "./Buttons";
import { getLayoutedElements } from "@/utils/getLayoutedElements";

const nodeTypes: NodeTypes = {
  progressNode: ProgressNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
  "vertical"
);

export function Treemap() {
  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges] = useState<Edge[]>(layoutedEdges);

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
        <Panel position="bottom-left">
          <Buttons />
        </Panel>
      </ReactFlow>
    </div>
  );
}
