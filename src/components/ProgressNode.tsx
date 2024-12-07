import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type ProgressNode = Node<{ label: string }>;

export function ProgressNode({ data }: NodeProps<ProgressNode>) {
  return (
    <button className="flex flex-col items-center gap-2 px-4 justify-center rounded-md w-56 py-4 bg-[#874EF9] hover:filter">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-transparent border-0"
      />
      <p className="text-white">{data.label}</p>
      <div className="w-full h-2 bg-[#EFEAFA] rounded-sm overflow-hidden">
        <div className="w-1/2 h-full bg-[#32EEB4] transition-[height] duration-500" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-transparent border-0"
      />
    </button>
  );
}
