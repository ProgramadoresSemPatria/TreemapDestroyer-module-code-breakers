import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
import { ExercisesTable } from "./ExercisesTable";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useDoneExerciceStore } from "@/stores/useDoneExerciseStore";
import { exercises as allExercises } from "@/constants/exercises";

type ProgressNode = Node<{ id: string; label: string }>;

export function ProgressNode({ data }: NodeProps<ProgressNode>) {
  const { doneExercisesId } = useDoneExerciceStore();
  const exercises = allExercises.filter(
    (exercise) => exercise.nodeId === data.id
  );
  const doneExercises = exercises.filter((exercise) => {
    return doneExercisesId?.[exercise.id] || false;
  });
  const doneExercisesPercentage =
    (doneExercises.length / exercises.length) * 100;

  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex flex-col items-center gap-2 px-4 justify-center rounded-md w-56 py-4 bg-[#874EF9] hover:filter">
          <Handle
            type="target"
            position={Position.Top}
            className="bg-transparent border-0"
          />
          <p className="text-white">{data.label}</p>
          <div className="w-full h-2 bg-[#EFEAFA] rounded-sm overflow-hidden">
            <div
              style={{ width: `${doneExercisesPercentage}%` }}
              className="h-full bg-[#32EEB4] transition-[width] duration-500"
            />
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            className="bg-transparent border-0"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader className="gap-2">
          <DialogTitle>{data.label}</DialogTitle>
          <DialogDescription>
            <div className="w-full h-2 bg-[#EFEAFA] rounded-sm overflow-hidden">
              <div
                style={{ width: `${doneExercisesPercentage}%` }}
                className="h-full bg-[#32EEB4] transition-[width] duration-500"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <ExercisesTable nodeId={data.id} />
      </DialogContent>
    </Dialog>
  );
}
