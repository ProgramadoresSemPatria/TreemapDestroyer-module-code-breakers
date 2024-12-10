import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Edge,
  MarkerType,
  Node,
  NodeTypes,
  OnNodesChange,
  Panel,
  ReactFlow,
} from "@xyflow/react";

import { initialNodes } from "../constants/initialNodes";
import { initialEdges } from "../constants/initialEdges";
import { ProgressNode } from "./ProgressNode";
import { useCallback, useState } from "react";
import { Buttons } from "./Buttons";
import { getLayoutedElements } from "@/utils/getLayoutedElements";
import { Preferences } from "./Preferences";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { SlidingTabBar } from "./SlidingTabs";

const nodeTypes: NodeTypes = {
  progressNode: ProgressNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export function Treemap() {
  const { theme, isDraggable, enableZooming, panOnDrag } = useSettingsStore();
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
        defaultEdgeOptions={{
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: {
            strokeWidth: 2,
            stroke: theme === "dark" ? "#979797" : "",
          },
          type: "smoothstep",
        }}
        colorMode={theme}
        nodesDraggable={isDraggable}
        zoomOnScroll={enableZooming}
        zoomOnDoubleClick={enableZooming}
        zoomOnPinch={enableZooming}
        panOnDrag={panOnDrag}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="bottom-left">
          <Buttons />
        </Panel>
        <Panel position="top-left">
          <Preferences />
        </Panel>
        <Panel position="bottom-right">
          <SlidingTabBar />
        </Panel>
      </ReactFlow>
    </div>
  );
}
