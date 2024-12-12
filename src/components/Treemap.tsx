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
  ReactFlowInstance,
} from "@xyflow/react";

import { ProgressNode } from "./ProgressNode";
import { useCallback, useRef, useState } from "react";
import { Buttons } from "./Buttons";
import { getLayoutedElements } from "@/utils/getLayoutedElements";
import { Preferences } from "./Preferences";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { SlidingTabBar } from "./SlidingTabs";
import { CourseNode } from "./CourseNode";
import { progressNodes } from "@/constants/progressNodes";
import { progressEdges } from "@/constants/progressEdges";
import { progressNodeSize } from "@/constants/nodeSizes";

const nodeTypes: NodeTypes = {
  progressNode: ProgressNode,
  courseNode: CourseNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  progressNodes,
  progressEdges,
  progressNodeSize
);

export function Treemap() {
  const { theme, isDraggable, enableZooming, panOnDrag } = useSettingsStore();
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [setNodes]
  );

  const onLayout = (
    nodes: Node[],
    edges: Edge[],
    size: { width: number; height: number }
  ) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      size
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    setTimeout(() => {
      reactFlowInstance.current?.fitView({ duration: 1000 });
    }, 0);
  };

  const getStrokeColor = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#979797"
        : "";
    }
    return theme === "dark" ? "#979797" : "";
  };

  return (
    <div className="absolute w-[100dvw] h-[100dvh]">
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
            stroke: getStrokeColor(),
          },
          type: "smoothstep",
        }}
        minZoom={0.2}
        colorMode={theme}
        nodesDraggable={isDraggable}
        zoomOnScroll={enableZooming}
        zoomOnDoubleClick={enableZooming}
        zoomOnPinch={enableZooming}
        panOnDrag={panOnDrag}
        fitView
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="bottom-left">
          <Buttons />
        </Panel>
        <Panel position="top-left">
          <Preferences />
        </Panel>
        <Panel position="bottom-right">
          <SlidingTabBar onLayout={onLayout} />
        </Panel>
      </ReactFlow>
    </div>
  );
}
