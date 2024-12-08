import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ExternalLink, MonitorPlay } from "lucide-react";
import { IExercise, TDifficulty } from "@/types/IExercise";
import { useDoneExerciceStore } from "@/stores/useDoneExerciseStore";
import { Checkbox } from "./ui/checkbox";
import clsx from "clsx";

interface ExercisesTableProps {
  exercises: IExercise[];
}

const difficultyColors: Record<TDifficulty, string> = {
  Easy: "#19b181",
  Medium: "#dfb339",
  Hard: "red",
};

export function ExercisesTable({ exercises }: ExercisesTableProps) {
  const { doneExercisesId } = useDoneExerciceStore();

  const changeStatus = (exerciseId: string) => {
    const isExerciseDone = doneExercisesId?.[exerciseId] || false;
    if (!isExerciseDone) {
      markExerciseAsDone(exerciseId);
      return;
    }
    markExerciseAsUndone(exerciseId);
  };

  const markExerciseAsDone = (exerciseId: string) => {
    useDoneExerciceStore.setState({
      doneExercisesId: {
        ...doneExercisesId,
        [exerciseId]: true,
      },
    });
  };

  const markExerciseAsUndone = (exerciseId: string) => {
    const filteredExercises = doneExercisesId;
    delete filteredExercises?.[exerciseId];
    useDoneExerciceStore.setState({
      doneExercisesId: filteredExercises,
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Problem</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead className="text-center">Solution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.map((exercise) => (
          <TableRow
            key={exercise.id}
            className={clsx("hover:bg-gray-100 transition-colors")}
          >
            <TableCell className="flex justify-center items-center">
              <div>
                <Checkbox
                  checked={doneExercisesId?.[exercise.id] || false}
                  onChange={() => changeStatus(exercise.id)}
                />
              </div>
            </TableCell>
            <TableCell>
              <a
                className="flex items-center gap-2"
                target="_blank'"
                href={exercise.link}
              >
                {exercise.problem}
                <ExternalLink color="#5316CC" size={16} />
              </a>
            </TableCell>
            <TableCell style={{ color: difficultyColors[exercise.difficulty] }}>
              {exercise.difficulty}
            </TableCell>
            <TableCell className="flex items-center justify-center">
              <a target="_blank" href={exercise.solution}>
                <MonitorPlay strokeWidth={1.2} />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}