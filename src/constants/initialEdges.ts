import { DefaultEdgeOptions, Edge } from "@xyflow/react";

export const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "el1-3", source: "1", target: "3" },
];
