import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { MonitorPlay } from "lucide-react";
import { IExercise, TDifficulty } from "@/types/IExercise";
import { useDoneExerciceStore } from "@/stores/useDoneExerciseStore";

interface ExercisesTableProps {
  exercises: IExercise[];
}

const difficultyColors: Record<TDifficulty, string> = {
  Easy: "green",
  Medium: "#c39310",
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
          <TableHead>Status</TableHead>
          <TableHead>Problem</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Solution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell>
              <input
                checked={doneExercisesId?.[exercise.id] || false}
                type="checkbox"
                onChange={() => changeStatus(exercise.id)}
              />
            </TableCell>
            <TableCell>
              <a target="_blank'" href={exercise.link}>
                {exercise.problem}
              </a>
            </TableCell>
            <TableCell style={{ color: difficultyColors[exercise.difficulty] }}>
              {exercise.difficulty}
            </TableCell>
            <TableCell className="flex items-center justify-center">
              <a target="_blank" href={exercise.solution}>
                <MonitorPlay color="#3f3e3e" strokeWidth={1.2} />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
