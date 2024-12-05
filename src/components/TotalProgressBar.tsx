import { exercises } from "../constants/exercises";
import { useDoneExercicesStore } from "../stores/useDoneExercicesStore";

export function TotalProgressBar() {
  const { doneExercisesId } = useDoneExercicesStore();
  const doneExercicesPercentage =
    (doneExercisesId.length / exercises.length) * 100;

  return (
    <div className="flex items-end w-full h-full bg-[#5316cc1a] rounded-sm">
      <div
        className="w-full rounded-sm bg-[#32EEB4] transition-[height] duration-500"
        style={{ height: `${doneExercicesPercentage}%` }}
      />
    </div>
  );
}
