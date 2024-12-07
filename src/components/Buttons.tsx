import { useReactFlow, useStoreApi } from "@xyflow/react";
import { exercises } from "../constants/exercises";
import { useDoneExerciceStore } from "../stores/useDoneExerciseStore";

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
      <button
        className="w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
        onClick={() => zoomIn({ duration: 300 })}
      >
        +
      </button>
      <button
        className="w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
        onClick={() => zoomOut({ duration: 300 })}
      >
        -
      </button>
      <button
        className="w-full aspect-square rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)]"
        onClick={focusNode}
      >
        full
      </button>
      <div className="w-full h-52 rounded-[0.25rem] bg-white shadow-[0_0_50px_rgba(0,0,0,0.25)] p-1">
        <div className="flex items-end w-full h-full bg-[#5316cc1a] rounded-sm">
          <div
            className="w-full rounded-sm bg-[#32EEB4] transition-[height] duration-500"
            style={{ height: `${doneExercicesPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
