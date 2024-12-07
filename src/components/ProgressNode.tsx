import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type ProgressNode = Node<{ label: string }>;

export function ProgressNode({ data }: NodeProps<ProgressNode>) {
  return (
    <button className="flex items-center justify-center rounded-md w-56 py-4 bg-[#874EF9] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-transparent border-0"
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-transparent border-0"
      />
    </button>
  );
}
