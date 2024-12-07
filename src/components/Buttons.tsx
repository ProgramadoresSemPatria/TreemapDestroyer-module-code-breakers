import { useReactFlow, useStoreApi } from "@xyflow/react";
import { exercises } from "../constants/exercises";
import { useDoneExerciceStore } from "../stores/useDoneExerciseStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Maximize, Minus, Plus } from "lucide-react";

export function Buttons() {
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();
  const { doneExercisesId } = useDoneExerciceStore();
  const doneExercicesPercentage =
    (doneExercisesId.length / exercises.length) * 100;

  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      const x = node.position.x + (node.measured.width ?? 0) / 2;
      const y = node.position.y + (node.measured.height ?? 0) / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-10">
      <Tooltip>
        <TooltipTrigger>
          <button
            className="animate-left-to-right flex justify-center items-center w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => {
              e.preventDefault();
              zoomIn({ duration: 300 });
            }}
          >
            <Plus className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          side="right"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          Zoom in
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button
            className="animate-left-to-right delay-75 flex justify-center items-center w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => {
              e.preventDefault();
              zoomOut({ duration: 300 });
            }}
          >
            <Minus className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          side="right"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          Zoom out
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button
            className="animate-left-to-right delay-150 flex justify-center items-center w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => {
              e.preventDefault();
              focusNode();
            }}
          >
            <Maximize className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          side="right"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          Center nodes
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={(e) => e.preventDefault()}>
          <div className="animate-left-to-right delay-300 w-full h-52 rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)] p-1">
            <div className="flex items-end w-full h-full bg-[#5316cc1a] rounded-sm">
              <div
                className="w-full rounded-sm bg-[#32EEB4] transition-[height] duration-500"
                style={{ height: `${doneExercicesPercentage}%` }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          side="right"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          {doneExercisesId.length}/{exercises.length}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
