import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type ProgressNode = Node<{ label: string }>;

export function ProgressNode({ data }: NodeProps<ProgressNode>) {
  return (
    <button className="flex items-center justify-center w-56 py-4 bg-blue-500">
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </button>
  );
}
