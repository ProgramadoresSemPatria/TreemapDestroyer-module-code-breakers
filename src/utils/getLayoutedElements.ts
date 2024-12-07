import dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 100;

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "vertical" | "horizontal" = "vertical"
) => {
  const isHorizontal = direction === "horizontal";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode as Node;
  });

  return { nodes: newNodes, edges };
};
